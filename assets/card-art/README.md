# Card Art Prototype Assets

This folder contains prototype card artwork downloaded from official issuer pages for local MVP design work.

These assets are useful because users recognize card faces faster than card names.

Usage rules:

- Keep source metadata in [data/card-art-sources.json](../../data/card-art-sources.json).
- Prefer official issuer product pages over search-engine images.
- Keep the unmodified official download in `raw`.
- Copy only assets marked `approved` into `public/card-art`.
- At a 2x target pixel ratio, never render an asset above half of its source width or height.
- Preserve each issuer's original landscape or portrait orientation.
- Run `npm run card-art:validate` after changing the manifest or any card image.
- Do not treat downloaded card artwork as owned project artwork.
- Do not alter card art in a way that implies issuer endorsement.
- Review rights before public redistribution or production self-hosting.
