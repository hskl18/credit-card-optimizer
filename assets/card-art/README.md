# Card Art Prototype Assets

This folder contains prototype card artwork downloaded from official issuer pages for local MVP design work.

These assets are useful because users recognize card faces faster than card names.

Usage rules:

- Keep source metadata in [data/card-art-sources.json](../../data/card-art-sources.json).
- Prefer official issuer product pages over search-engine images.
- Keep the unmodified official download in `raw`, even when it is below the publication threshold.
- Copy only assets marked `approved` into `public/card-art`.
- Require at least 600 source pixels across when the UI renders artwork at no more than 300 CSS pixels for a 2x display.
- Run `npm run card-art:validate` after changing the manifest or any card image.
- Do not treat downloaded card artwork as owned project artwork.
- Do not alter card art in a way that implies issuer endorsement.
- Review rights before public redistribution or production self-hosting.
