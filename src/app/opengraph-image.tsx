import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/lib/site";

export const alt = siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ebe6da",
          color: "#17150f",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%"
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>{siteName}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.1 }}>
            The right card, every purchase.
          </div>
          <div style={{ color: "#6b6456", fontSize: 30, lineHeight: 1.35 }}>{siteDescription}</div>
        </div>
        <div style={{ borderTop: "2px solid #cbc3b1", paddingTop: 22, fontSize: 26 }}>
          27 U.S. cards · dollars per $100 · net of the annual fee
        </div>
      </div>
    ),
    size
  );
}
