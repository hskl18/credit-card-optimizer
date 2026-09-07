# Card Compass

Which credit card to use for every purchase, in dollars.

Reward rates are published in units nobody can compare: `4x` on one card, `6%` on another, and a point is worth anywhere from 0.6 to 2.05 cents depending on how you redeem it.
Card Compass converts every rate into one number — dollars back per $100 spent — so the cards can actually be ranked against each other.

Everything runs in the browser.
There is no account, no bank linking, and no card numbers; your wallet lives in `localStorage` and never leaves the device.

## Screens

- `/` — the best card for each of 13 spending categories, restricted to rates you get automatically.
- `/cards` — all 27 cards ranked by what you keep in a year after the annual fee, against a spend profile you can edit.
- `/cards/[slug]` — one card: its redemption ladder, where it earns most, what its annual fee needs back, and every published reward rule.
- `/wallet` — add the cards you already carry and see which one wins in each category.
- `/methodology` — how the numbers are built, what a point is worth in each program, known gaps, and every source.

## Running it

```sh
pnpm install
pnpm dev
```

`pnpm lint` type-checks, `pnpm test` validates the data files and runs the unit tests, and `pnpm build` produces the static export.

## How a number is built

A rate becomes `dollars per $100 = rate × cents per point`, where cash back is one cent by definition.
Two redemption modes are offered: the issuer's published cash-out rate, and a transfer to airline and hotel partners.
The transfer figure is a ceiling rather than a promise, so every card also shows what the same rate pays cashed out.

Rates that need you to pick a category, activate a quarter, or book through the issuer are flagged, never assumed.
An opt-in card is credited with one category at a time, because that is all you get.
A rotating quarterly bonus counts for one quarter, not a year.

Statement credits, lounge access, and sign-up bonuses are not counted at all, so a premium card can score worse here than it is worth to you.
Spending caps are flagged but not subtracted.

## Data

| File | What it holds |
| --- | --- |
| `data/card-catalog-v0.json` | 27 cards: issuer, annual fee, reward rules, source URLs |
| `data/point-valuations.json` | What a point is worth in each program, and every redemption path |
| `data/card-art-sources.json` | Where each card image came from, and its known defects |

Official issuer pages are canonical for rewards and availability.
Point valuations come from [The Points Guy's monthly valuations](https://thepointsguy.com/guide/monthly-valuations/); default spend figures are anchored on the [BLS Consumer Expenditure Survey](https://www.bls.gov/cex/).
Community sources are discovery inputs only.

`pnpm run card-art:validate` checks the data files against each other and fails the build on a mismatch.
It also reports the known defects listed below.

This is a starter catalog.
Reverify anything before acting on it, and in particular the Citi Custom Cash and Wells Fargo Attune base rates, which were filled in from published terms rather than a fetched issuer page.

## License

The source code is MIT licensed; see [LICENSE](LICENSE).

That covers the code only.
Card artwork under `public/card-art/` and `assets/card-art/raw/` belongs to the respective issuers and is **not** licensed for reuse.
`data/point-valuations.json` restates third-party valuations that are attributed in the file and on the Info screen.

## Artwork and trademarks

Card images are downloaded from official issuer pages and self-hosted, one per card, at the size the source supports.
Four cards ship no image at all: the official download has an issuer promotional badge burned into the pixels, so it is withheld rather than republished.
Their entries stay in `data/card-art-sources.json` with `status: "withheld_promotional_badge"`, and `pnpm test` names them on every run.

Card Compass is an independent project.
It is not affiliated with, authorised by, or endorsed by any card issuer, and it is not financial advice.
