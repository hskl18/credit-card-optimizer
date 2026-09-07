import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "data/card-art-sources.json");
const catalogPath = join(root, "data/card-catalog-v0.json");
const valuationPath = join(root, "data/point-valuations.json");
const publicDirectory = join(root, "public/card-art");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const valuations = JSON.parse(readFileSync(valuationPath, "utf8"));
const errors = [];
const expectedPublicFiles = new Set();
const catalogSlugs = new Set(catalog.cards.map((card) => card.slug));
const manifestSlugs = new Set();
const targetDevicePixelRatio = manifest.metadata.target_device_pixel_ratio;

if (targetDevicePixelRatio < 2) {
  errors.push("target_device_pixel_ratio must be at least 2");
}

for (const asset of manifest.assets) {
  if (!catalogSlugs.has(asset.card_slug)) {
    errors.push(`${asset.card_slug}: no matching catalog card`);
  }

  if (manifestSlugs.has(asset.card_slug)) {
    errors.push(`${asset.card_slug}: duplicate manifest entry`);
  }
  manifestSlugs.add(asset.card_slug);

  if (asset.status === "withheld_promotional_badge") {
    if (asset.local_path || asset.pixel_width || asset.pixel_height) {
      errors.push(`${asset.card_slug}: a withheld asset must not record a local file`);
    }
    if (!asset.note) {
      errors.push(`${asset.card_slug}: a withheld asset needs a note saying why`);
    }
    continue;
  }

  if (!asset.local_path) {
    errors.push(`${asset.card_slug}: only a withheld asset may omit local_path`);
    continue;
  }

  const rawPath = join(root, asset.local_path);
  if (!existsSync(rawPath)) {
    errors.push(`${asset.card_slug}: missing raw asset ${asset.local_path}`);
    continue;
  }

  const dimensions = readImageDimensions(rawPath);
  if (dimensions.width !== asset.pixel_width || dimensions.height !== asset.pixel_height) {
    errors.push(
      `${asset.card_slug}: manifest says ${asset.pixel_width}x${asset.pixel_height}, file is ${dimensions.width}x${dimensions.height}`,
    );
  }

  const longEdge = Math.max(dimensions.width, dimensions.height);
  const shortEdge = Math.min(dimensions.width, dimensions.height);
  const ratio = longEdge / shortEdge;
  if (ratio < 1.35 || ratio > 1.7) {
    errors.push(`${asset.card_slug}: unexpected card-art aspect ratio ${ratio.toFixed(3)}`);
  }

  const publicFilename = basename(asset.local_path);
  const publicPath = join(publicDirectory, publicFilename);
  if (asset.status === "approved") {
    expectedPublicFiles.add(publicFilename);
    if (!existsSync(publicPath)) {
      errors.push(`${asset.card_slug}: approved asset is missing from public/card-art`);
    } else {
      const publicDimensions = readImageDimensions(publicPath);
      if (
        publicDimensions.width !== dimensions.width ||
        publicDimensions.height !== dimensions.height
      ) {
        errors.push(`${asset.card_slug}: public copy dimensions do not match the raw asset`);
      }
    }
  } else if (existsSync(publicPath)) {
    errors.push(`${asset.card_slug}: unapproved asset must not be present in public/card-art`);
  }
}

for (const slug of catalogSlugs) {
  if (!manifestSlugs.has(slug)) {
    errors.push(`${slug}: missing card-art manifest entry`);
  }
}

if (existsSync(publicDirectory)) {
  for (const filename of readdirSync(publicDirectory)) {
    if (!expectedPublicFiles.has(filename)) {
      errors.push(`public/card-art/${filename}: file is not an approved manifest asset`);
    }
  }
}

for (const asset of manifest.assets) {
  if (asset.status !== "approved") {
    console.log(`HOLD ${asset.card_slug} ${asset.status}`);
    continue;
  }
  const safeWidth = Math.floor(asset.pixel_width / targetDevicePixelRatio);
  const safeHeight = Math.floor(asset.pixel_height / targetDevicePixelRatio);
  console.log(
    `PASS ${asset.card_slug} ${asset.pixel_width}x${asset.pixel_height} source, up to ${safeWidth}x${safeHeight} CSS px`,
  );
}

// src/lib/recommendation/value.ts trusts this shape instead of parsing it in the
// browser, so the check has to live here.
for (const program of [valuations.default_program, ...valuations.programs]) {
  const where = `point-valuations ${program?.id ?? "(missing id)"}`;
  if (typeof program?.id !== "string" || typeof program?.label !== "string") {
    errors.push(`${where}: needs a string id and label`);
  }
  for (const field of ["cash_cents", "travel_cents"]) {
    if (typeof program?.[field] !== "number" || program[field] <= 0) {
      errors.push(`${where}: ${field} must be a positive number`);
    }
  }
  if (!Array.isArray(program?.paths) || program.paths.length === 0) {
    errors.push(`${where}: needs at least one redemption path`);
  } else {
    for (const path of program.paths) {
      if (typeof path?.label !== "string" || typeof path?.cents !== "number" || path.cents <= 0) {
        errors.push(`${where}: every path needs a label and a positive cents value`);
      }
    }
  }
}

const withheld = manifest.assets.filter(
  (asset) => asset.status === "withheld_promotional_badge",
);
if (withheld.length > 0) {
  console.log(
    `${withheld.length} assets are withheld for carrying an issuer promotional badge: ${withheld.map((asset) => asset.card_slug).join(", ")}`,
  );
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR ${error}`);
  }
  process.exitCode = 1;
} else {
  const approvedCount = manifest.assets.filter((asset) => asset.status === "approved").length;
  console.log(`Validated ${manifest.assets.length} assets. ${approvedCount} approved for public rendering.`);
}

function readImageDimensions(path) {
  const buffer = readFileSync(path);

  if (buffer.subarray(1, 4).toString("ascii") === "PNG") {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    const format = buffer.subarray(12, 16).toString("ascii");
    if (format === "VP8X") {
      return {
        width: readUInt24LE(buffer, 24) + 1,
        height: readUInt24LE(buffer, 27) + 1,
      };
    }
    if (format === "VP8L") {
      return {
        width: 1 + buffer[21] + ((buffer[22] & 0x3f) << 8),
        height: 1 + (buffer[22] >> 6) + (buffer[23] << 2) + ((buffer[24] & 0x0f) << 10),
      };
    }
    if (format === "VP8 ") {
      const startCode = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 20);
      if (startCode !== -1) {
        return {
          width: buffer.readUInt16LE(startCode + 3) & 0x3fff,
          height: buffer.readUInt16LE(startCode + 5) & 0x3fff,
        };
      }
    }
  }

  throw new Error(`${path}: unsupported image format`);
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16);
}
