# Credit Card Optimizer

This repo is the planning and data foundation for a free, privacy-first credit card rewards platform.

Current status: the public MVP is temporarily paused.
The visible Next.js routes now show an offline notice while card data completeness and card artwork quality are cleaned up.

The product direction is simple:

- Show current recommended credit cards on the homepage.
- Rate mainstream U.S. credit cards with a transparent model.
- Let users manually add cards to a dashboard without bank login, account aggregation, or card numbers.
- Tell users which card to use for common spending categories.
- Suggest useful next cards based on the cards a user already has.

Current artifacts:

- [Market research and product plan](docs/market-research-and-product-plan.md)
- [Competitive research](docs/competitive-research.md)
- [Next.js MVP concrete plan](docs/mvp-nextjs-plan.md)
- [Starter card catalog](data/card-catalog-v0.json)
- [Card art source manifest](data/card-art-sources.json)

The first version intentionally treats official issuer pages and CFPB public agreement data as canonical sources.
Reddit and community posts are useful for discovering edge cases, merchant coding issues, and user pain, but they should not override official terms.
