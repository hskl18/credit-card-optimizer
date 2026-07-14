# Next.js MVP Concrete Plan

Research and planning date: 2026-06-27.

## Goal

Build the first web-first MVP of a free, simple, no-bank-login credit card optimizer using Next.js.

The first release should feel like a useful web page, not a heavy finance app.
Users should be able to open the site, recognize cards by image, select the cards they own, choose a spending category, and immediately see which card to use and why.

## Current Facts

- The repo currently has planning docs and a starter card catalog.
- The current structured catalog is [data/card-catalog-v0.json](../data/card-catalog-v0.json).
- The current planning docs are [docs/market-research-and-product-plan.md](market-research-and-product-plan.md) and [docs/competitive-research.md](competitive-research.md).
- The repo does not yet contain a Next.js app.
- The product direction is intentionally web-first, simple, free, and no-bank-login.
- Competitors are stronger as mobile apps, browser extensions, bank-sync tools, or affiliate marketplaces.

## Product Shape

The MVP should be one clear web experience:

1. The homepage shows recommended cards by simple use case.
2. The card explorer lets users search and filter cards.
3. The card detail page explains what a card is good for.
4. The wallet dashboard lets users manually add cards they own.
5. The category optimizer tells users which owned card to use for a purchase.
6. The next-card suggestion panel shows the most useful missing card categories.

The first screen should not be a marketing landing page.
It should immediately show card recommendations and a wallet-building interaction.

## Technology Selection

Use Next.js with App Router.

Recommended stack:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for basic components only when it saves time.
- lucide-react for icons.
- next/image for card artwork.
- Zod for data schema validation.
- Vitest for recommendation logic tests.
- Playwright for the core user flow.

The first implementation can use local JSON data and browser localStorage.
No database is needed for MVP v1.
No auth is needed for MVP v1.
No bank integration is needed for MVP v1.

## First App Routes

Use these routes:

- `/` for homepage and quick wallet builder.
- `/cards` for searchable card explorer.
- `/cards/[slug]` for card details.
- `/wallet` for manual dashboard and optimizer.
- `/methodology` for scoring, sources, and assumptions.

Keep the navigation small:

- Cards.
- Wallet.
- Methodology.

## Data Files

Keep data in the repo first:

- `data/card-catalog-v0.json` for card rules.
- `data/card-art-sources.json` for card image source URLs.
- `src/lib/cards/schema.ts` for Zod validation.
- `src/lib/cards/catalog.ts` for loading and normalizing cards.
- `src/lib/recommendation/categories.ts` for supported spending categories.
- `src/lib/recommendation/recommend.ts` for deterministic card ranking.
- `src/lib/recommendation/score.ts` for public card rating logic.

The data layer should be boring and inspectable.
This matters because the product's trust advantage comes from transparent rules.

## MVP Development Rhythm

### Phase 1: Next.js scaffold

Deliverable:

- Create the Next.js app in this repo.
- Add Tailwind, TypeScript, linting, and basic app layout.
- Add a quiet modern UI theme that is clean, readable, and card-image driven.

Validation:

- `npm run lint`.
- `npm run build`.
- Open the homepage in browser and verify the layout is not blank.

### Phase 2: Data loading and card explorer

Deliverable:

- Validate `data/card-catalog-v0.json` with Zod.
- Render cards from local JSON.
- Show card image, issuer, reward currency, best-for tags, and top categories.
- Add search and issuer/category filters.

Validation:

- Invalid card data fails loudly.
- Card explorer renders every card in the catalog.
- A user can find Amex Platinum, Amex Gold, Chase Sapphire Preferred, Prime Visa, and Citi Double Cash.

### Phase 3: Manual wallet dashboard

Deliverable:

- Let users add and remove cards they own.
- Store wallet state in localStorage.
- Show selected cards as a compact card grid.
- Avoid accounts, bank login, card numbers, and transaction history.

Validation:

- Refreshing the page keeps the selected wallet.
- Clearing localStorage resets the wallet.
- The app never asks for sensitive account data.

### Phase 4: Category optimizer

Deliverable:

- Add default spending categories such as dining, grocery, Amazon, gas, EV charging, travel, hotels, streaming, transit, drugstores, wholesale, utilities, and general spend.
- For a selected category, rank the user's owned cards.
- Show the top card and a short explanation.
- Show caveats such as caps, activation, portal requirement, and known exclusions.

Validation:

- Prime Visa wins Amazon for eligible Prime users.
- Amex Gold wins dining against Amex Platinum in a wallet containing both.
- A flat 2 percent card wins general spend when the wallet has no stronger category card.
- Cards with discontinued new applications are clearly labeled.

### Phase 5: Homepage recommendations

Deliverable:

- Show simple public recommendations by use case.
- Examples: Best simple cash back, best dining, best grocery, best Amazon, best beginner travel, best premium travel, best no-fee starter combo.
- Each recommendation should link to the source-backed card detail page.

Validation:

- The homepage is useful without creating an account.
- Every recommendation has a visible reason.
- Every recommendation links to a source-backed detail page.

### Phase 6: Rating and methodology

Deliverable:

- Add a simple explainable rating score.
- Show score inputs: reward strength, ease of use, annual fee burden, ecosystem flexibility, keeper value, and risk flags.
- Add `/methodology` with scoring assumptions and point-value defaults.

Validation:

- Ratings are deterministic from local data.
- Users can see why a card scored high or low.
- Changing point-value assumptions changes affected scores in tests.

### Phase 7: AI-assisted data workflow

Deliverable:

- Use AI to assist with data normalization, card copy drafts, caveat extraction, source diff summaries, and plain-English explanations.
- Keep final recommendation logic deterministic.
- Require source URLs for every AI-assisted data change.

Validation:

- AI output cannot update production data without schema validation.
- The app can still explain recommendations without calling an AI model at runtime.

## Visual Design Direction

The UI should be modern, lightweight, and highly scannable.

Design principles:

- Card artwork is the primary recognition layer.
- Names and issuer text are secondary.
- The interface should feel like a clean utility page, not a banking app.
- Avoid giant marketing hero sections.
- Avoid visual clutter from too many rewards numbers at once.
- Use dense but readable card grids.
- Keep cards at 8px border radius or less unless the card artwork itself has rounded corners.
- Use icons for filters, wallet actions, and category controls.

Suggested first viewport:

- Left side: quick wallet builder with card search.
- Main area: recommended cards by use case.
- Right or lower area: category quick test.

Mobile behavior:

- Start with search and selected wallet.
- Collapse recommendations into horizontal card rows.
- Keep category optimizer one tap away.

## Credit Card Image Plan

Card images should be handled as a source-backed asset pipeline, not as random scraped images.

MVP approach:

1. Research official issuer product pages.
2. Extract card-art URLs from official pages where possible.
3. Store image metadata in `data/card-art-sources.json`.
4. Download prototype copies to `assets/card-art/raw`.
5. Keep the source URL and source page with every image.
6. Use these for local prototype and visual QA.
7. Before public production launch, review whether to self-host, remote-load, replace, or request permission.

Do not scrape blog screenshots, marketplace images, or random Google Images results.
Use official issuer product pages first.

Do not crop out issuer marks or modify card art in a way that makes it look like the platform owns the card designs.
Use images only for product identification.

## Initial Card Art Targets

Start with the cards people recognize most:

- Chase Sapphire Preferred.
- Chase Sapphire Reserve.
- Chase Freedom Unlimited.
- Chase Freedom Flex.
- Prime Visa.
- Amex Platinum.
- Amex Gold.
- Amex Blue Cash Preferred.
- Capital One Venture X.
- Capital One Savor.
- Citi Double Cash.
- Citi Strata Premier.
- Bank of America Customized Cash Rewards.
- Wells Fargo Active Cash.
- Wells Fargo Autograph.
- U.S. Bank Smartly.
- Discover it Cash Back.

## Risks

- Official card artwork is trademarked and may have usage restrictions.
- Issuer pages can change asset URLs without warning.
- Hotlinking images may break or violate issuer expectations.
- Downloaded images may not be legally appropriate for redistribution in a public repo.
- Recommendation quality can degrade if the category taxonomy is too coarse.
- A beautiful UI can still fail if the explanation logic is not trustworthy.

## Validation

Run these checks before calling MVP v1 done:

- `npm run lint`.
- `npm run build`.
- `npm run test`.
- `npx playwright test`.
- Browser check at desktop width.
- Browser check at mobile width.
- Confirm card images render and are not stretched.
- Confirm text does not overlap card images.
- Confirm add-card, remove-card, category-select, and recommendation flows work.
- Confirm every displayed reward rule has a source-backed card record.

## Stop Conditions

Stop and ask before adding bank login.
Stop and ask before adding accounts or user auth.
Stop and ask before adding affiliate links.
Stop and ask before committing downloaded card artwork for public redistribution.
Stop and ask before using AI-generated recommendations at runtime.

## First Build Definition

The first successful MVP is:

- A Next.js site.
- A card-image-driven homepage.
- A searchable card explorer.
- A manual wallet dashboard using localStorage.
- A category optimizer with deterministic explanations.
- A small but polished set of mainstream cards.
- No bank login.
- No account creation.
- No affiliate ranking.
