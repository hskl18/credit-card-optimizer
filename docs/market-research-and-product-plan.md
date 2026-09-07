# Market Research and Product Plan

Research date: 2026-06-27.

## Goal

Build a completely free public platform that helps U.S. users understand mainstream credit cards, maintain a manual wallet dashboard, and choose the best card for each purchase category without giving the product any bank login credentials.

## Current Facts

- The repo was empty when this report was created.
- The repo was not initialized as a git repository.
- The product should start with the real wallet workflow instead of a marketing shell.
- The product should keep local demo data and production data boundaries explicit.
- The product should not ask users to link bank accounts in the first version.

## Market Read

Many existing tools solve rewards optimization by asking users to connect accounts, install a browser extension, or pay for premium automation.
MaxRewards says it connects to credit card accounts and automatically activates offers across issuers such as Amex, Chase, Capital One, Bank of America, Citi, Wells Fargo, USAA, and U.S. Bank.
Source: [MaxRewards App Store listing](https://apps.apple.com/us/app/maxrewards-credit-card-rewards/id1435710443).

CardPointers takes a more privacy-friendly direction and says users can auto-add issuer offers without sharing logins or purchase history.
Its app listing also says it tracks category bonuses and recurring credits across more than 5,000 cards.
Sources: [CardPointers homepage](https://cardpointers.com/) and [CardPointers App Store listing](https://apps.apple.com/us/app/cardpointers-for-credit-cards/id1472875808).

Reddit discussions show two useful product signals.
Users care about fragile bank connections and account lock risk when apps connect to issuer accounts.
Users also need practical interpretation of category rules, such as what counts as online grocery, Amazon, wholesale, dining, and travel portal spend.
Sources: [MaxRewards connection issue discussion](https://www.reddit.com/r/CreditCards/comments/s41pxn/maxrewards_locked_my_chase_account_and_i_spent/) and [Chase Sapphire Preferred online grocery discussion](https://www.reddit.com/r/CreditCards/comments/1fzxc68/groceries_on_chase_sapphire_preferred/).

The wedge for this repo should be a free, transparent, no-login public card optimizer.
It should be useful even if a user never creates an account.
If accounts are added later, they should store only manual wallet choices, category preferences, and optional spending assumptions.

## Canonical Data Sources

Issuer pages are the canonical source for rewards structure, availability, annual fee, card families, and benefit language.
The CFPB credit card agreement database is the canonical public source for card agreements, pricing, and fee documents across hundreds of issuers.
Sources: [CFPB agreement database](https://www.consumerfinance.gov/credit-cards/agreements/) and [CFPB credit card agreements and surveys](https://www.consumerfinance.gov/data-research/credit-card-data/).

Community sources should be second-level evidence.
Use Reddit, Doctor of Credit, myFICO, and specialist blogs for merchant coding behavior, downgrade paths, product-change experience, and user pain.
Community sources should never be the only source for a card's official reward rate.

## Mainstream Issuer Coverage

The first catalog should cover these issuer groups before adding niche banks or store-only cards:

- Chase: Sapphire Preferred, Sapphire Reserve, Freedom Unlimited, Freedom Flex, and Prime Visa.
- American Express: Platinum, Gold, Blue Cash Preferred, and Blue Cash Everyday.
- Capital One: Venture X, Venture, Savor, and Quicksilver.
- Citi: Double Cash, Strata Premier, Strata Elite, and Custom Cash for existing holders.
- Bank of America: Customized Cash Rewards, Unlimited Cash Rewards, Premium Rewards, Premium Rewards Elite, and Travel Rewards.
- Wells Fargo: Active Cash, Autograph, Autograph Journey, and Attune.
- U.S. Bank: Smartly, Cash Plus, Altitude Go, and Altitude Connect.
- Discover: Discover it Cash Back, Discover it Miles, and Discover it Chrome.

Bank of America should be treated as a larger family than just its three headline cash-back products.
The official Bank of America page separates cards by cash back, travel rewards, airline rewards, lower interest, build credit, student, points rewards, no annual fee, and no foreign transaction fee categories.
Sources: [Bank of America credit cards](https://www.bankofamerica.com/credit-cards/) and [Bank of America compare cards](https://www.bankofamerica.com/credit-cards/compare-credit-cards/).

Citi needs a status field on every card because product availability can change materially.
Citi's official Custom Cash page says Citi stopped accepting new applications for that product on 2026-05-28, while existing cardmembers are not impacted.
Source: [Citi Custom Cash](https://www.citi.com/credit-cards/citi-custom-cash-credit-card).

## Verified Reward Patterns

Chase Sapphire Preferred is now a strong mid-fee daily/travel hybrid.
Its official page lists 5x on Chase Travel, 3x dining, 3x gas and EV charging, 3x top streaming, 3x online grocery with exclusions, 2x other travel, and 1x other purchases.
Source: [Chase Sapphire Preferred](https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred).

Chase Freedom Unlimited and Freedom Flex are important because they form a common no-annual-fee base for Chase users.
Freedom Unlimited lists 3% dining, 3% drugstores, and 1.5% on all other purchases.
Freedom Flex has rotating 5% categories and also earns 3% dining and drugstores.
Sources: [Chase Freedom Unlimited](https://www.chase.com/personal/credit-cards/freedom/unlimited) and [Chase Freedom Flex](https://creditcards.chase.com/cash-back-credit-cards/freedom/flex).

Prime Visa is the default Amazon and Whole Foods recommendation for eligible Prime users.
It lists unlimited 5% back at Amazon.com, Audible.com, Whole Foods Market, and Chase Travel with eligible Prime membership.
Source: [Prime Visa](https://creditcards.chase.com/cash-back-credit-cards/amazon-prime-rewards).

American Express Gold is a top dining and U.S. supermarket points card.
Its official page lists 4x restaurants worldwide up to the yearly cap and 4x U.S. supermarkets up to the yearly cap.
Source: [American Express Gold](https://www.americanexpress.com/us/credit-cards/card/gold-card/).

American Express Platinum is mostly a premium travel and credits card, not a broad everyday spend card.
Its official page lists 5x flights purchased directly with airlines or through American Express Travel up to the yearly cap, 5x prepaid hotels booked through AmexTravel.com, and 1x other purchases.
Source: [American Express Platinum](https://www.americanexpress.com/us/credit-cards/card/platinum/).

American Express Blue Cash Preferred is a high-value grocery, streaming, gas, and transit cash-back card.
Its official page lists 6% U.S. supermarkets up to the yearly cap, 6% select U.S. streaming subscriptions, 3% transit, and 3% U.S. gas stations.
Source: [Amex Blue Cash Preferred](https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/).

Capital One Venture X is a simple premium travel card with a strong 2x floor.
Capital One lists 10x hotels and rental cars, 5x flights and vacation rentals through Capital One Travel, and 2x all other purchases.
Source: [Capital One travel cards](https://www.capitalone.com/credit-cards/travel-and-miles/).

Capital One Savor is a simple no-annual-fee dining, grocery, entertainment, and streaming card.
Its official page lists unlimited 3% grocery stores, dining, entertainment, and popular streaming services, plus 1% other purchases.
Source: [Capital One Savor](https://www.capitalone.com/credit-cards/savor/).

Citi Double Cash is a clean flat-rate card.
Its official page lists unlimited 2% cash back as 1% when buying and 1% when paying.
Source: [Citi Double Cash](https://www.citi.com/credit-cards/citi-double-cash-credit-card).

Citi Strata Premier is a broad points card for travel and everyday categories.
Its official page lists 10x hotels, car rentals, and attractions through Citi Travel, plus 3x air travel, hotels, restaurants, supermarkets, gas, and EV charging.
Source: [Citi Strata Premier](https://www.citi.com/credit-cards/citi-strata-premier-credit-card).

Bank of America Customized Cash Rewards is a flexible category cash-back card.
Its official page lists 3% in a choice category, 2% grocery stores and wholesale clubs, and 1% other purchases.
Source: [Bank of America Customized Cash Rewards](https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/cash-back-category-choices/).

Bank of America Unlimited Cash Rewards is a simple flat cash-back card.
Its official page lists 2% for the first year from account opening, then unlimited 1.5% on all purchases.
Source: [Bank of America Unlimited Cash Rewards](https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/).

Wells Fargo Active Cash is a strong no-annual-fee flat cash card.
Wells Fargo lists unlimited 2% cash rewards on purchases.
Source: [Wells Fargo cards](https://creditcards.wellsfargo.com/).

Wells Fargo Autograph is a strong no-annual-fee category points card.
Its official page lists unlimited 3x restaurants, travel, gas stations, transit, popular streaming services, and phone plans.
Source: [Wells Fargo Autograph](https://creditcards.wellsfargo.com/autograph-visa-credit-card/).

U.S. Bank Smartly is a relationship-based flat cash card.
U.S. Bank lists unlimited 2% cash back with the possibility of 2.5%, 3%, or 4% on the first $10,000 in eligible net purchases each billing cycle when paired with qualifying U.S. Bank accounts.
Source: [U.S. Bank Smartly](https://www.usbank.com/credit-cards/bank-smartly-visa-signature-credit-card.html).

U.S. Bank Cash Plus is a choose-your-category card.
U.S. Bank lists up to 5% cash back on two categories chosen each quarter, 2% on one everyday category, and 1% other purchases.
Source: [U.S. Bank credit cards](https://www.usbank.com/credit-cards.html).

Discover it Cash Back remains useful for rotating category maximizers.
Discover lists 5% Cashback Bonus on up to $1,500 in different category purchases each quarter when activated.
Source: [Discover 5% calendar](https://www.discover.com/credit-cards/cash-back/cashback-calendar.html).

## Product Scope

The MVP should have three user-facing surfaces.

Homepage recommendations should show current top cards by use case.
Examples include best flat cash back, best dining, best groceries, best Amazon, best travel beginner, best premium travel, and best no-bank-login dashboard starter.

Card ratings should be transparent and reproducible.
Each card should have a rating summary, category strengths, annual fee impact, redemption complexity, ecosystem notes, and source confidence.

The dashboard should let users manually add cards they already own.
The dashboard should never ask for bank login, card numbers, or transaction history in the MVP.

## Rating Model

The rating should be an explainable score, not a black-box affiliate ranking.

Use these components:

- Expected rewards value based on category multipliers, caps, and point value assumptions.
- Ease of use based on flat rate, activation requirements, merchant coding ambiguity, and portal dependency.
- Annual fee burden based on fee size and whether credits are easy to use.
- Ecosystem flexibility based on transfer partners, cash-out floor, and pooling rules.
- Wallet fit based on whether the card fills a real category gap.
- Keeper value based on long-term usefulness after welcome bonus.
- Risk flags based on discontinued applications, rotating categories, caps, and issuer restrictions.

Default score formula:

```text
score = expected_value * 0.35
      + ease_of_use * 0.20
      + ecosystem_flexibility * 0.15
      + keeper_value * 0.15
      + wallet_fit * 0.10
      - risk_penalty * 0.05
```

The score should always display the reason, not just a number.

## Default Spending Categories

The first dashboard should include these default categories:

- Dining and delivery.
- Grocery stores.
- Online grocery.
- Amazon.
- Wholesale clubs.
- Gas.
- EV charging.
- Transit.
- Rideshare.
- Flights.
- Hotels.
- Travel portal bookings.
- Drugstores.
- Streaming.
- Phone plans.
- Utilities.
- Online retail.
- Entertainment.
- Fitness and wellness.
- General non-category spend.

The category model needs issuer-specific exclusions.
Examples include Amex supermarket exclusions for superstores and warehouse clubs, Chase online grocery exclusions for Target, Walmart, and wholesale clubs, and U.S. Bank category selection rules.

## Recommendation Logic

The card picker should rank cards by purchase category and user wallet.
If a user has Amex Platinum, the system should not assume it is good for dining, groceries, or Amazon.
It should suggest complementary cards such as Amex Gold for dining and U.S. supermarkets, Blue Cash Preferred for cash-back groceries and streaming, Prime Visa for Amazon, or a flat 2% card for non-category spend.

The next-card recommendation should optimize for gaps.
If the user's wallet already has a premium travel card, the next suggestion should usually be an everyday earning card.
If the user's wallet has only flat cash back, the next suggestion can be a category card for their largest spending bucket.
If the user's wallet has rotating category cards, the dashboard should warn when activation or quarterly caps are required.

## Data Model

Each card should be stored as structured data with these fields:

- Issuer.
- Card name.
- Slug.
- Application status.
- Annual fee.
- Network.
- Reward currency.
- Reward rules.
- Reward caps.
- Redemption notes.
- Credits.
- Transfer partners.
- Category exclusions.
- Best-for tags.
- Source URLs.
- Last verified date.
- Confidence level.

Each reward rule should be normalized into machine-readable fields:

- Category.
- Rate.
- Rate type.
- Cap amount.
- Cap period.
- Booking channel requirement.
- Activation requirement.
- Exclusions.
- Source URL.

## Data Pipeline

Start with a curated JSON catalog in this repo.
Add a scraper or source-check script only after the schema is stable.

The first automated pipeline should do these jobs:

- Pull official issuer pages where allowed.
- Pull CFPB quarterly agreement archive metadata.
- Diff current data against the last verified catalog.
- Flag changed reward rates, annual fees, application status, and source page failures.
- Open a review issue or generate a Markdown report before changing production data.

This should be conservative because credit card terms change often.
The public app should show `last verified` and `source` near every recommendation.

## Work Plan

1. Create the data foundation.
   Deliver `data/card-catalog-v0.json`, a schema, and a small validation script.

2. Build the first public app workflow.
   Deliver a homepage, card explorer, card detail page, and manual wallet dashboard.

3. Implement the category optimizer.
   Deliver a category picker that answers which existing card to use and why.

4. Implement the rating engine.
   Deliver reproducible scores with visible assumptions and source confidence.

5. Implement next-card recommendations.
   Deliver gap-based suggestions that account for existing cards, categories, fees, and ecosystem overlap.

6. Add data freshness tooling.
   Deliver source checks, diff reports, and a weekly update workflow.

7. Add public contribution workflow.
   Deliver contribution docs, data review rules, and issue templates for card corrections.

## Risks

- Issuer terms change frequently and can make stored rewards stale.
- Some issuer pages render dynamically and may be hard to scrape reliably.
- Affiliate-driven rankings can bias the product if introduced too early.
- Point values are subjective and can distort ratings if hidden.
- Merchant category coding is messy and can cause user-visible wrong recommendations.
- A dashboard that appears to know transaction-level behavior without bank login would be misleading.

## Validation

- Validate JSON schema in CI.
- Add unit tests for category scoring and cap handling.
- Add snapshot tests for card detail pages so source-backed values stay visible.
- Run end-to-end tests for adding cards, picking a category, and receiving a recommendation.
- Manually verify homepage recommendations against the current catalog before each release.
- Keep a source review checklist for every changed reward rule.

## Stop Conditions

- Stop before adding bank-login account aggregation.
- Stop before adding affiliate links or paid placement.
- Stop before presenting Reddit-only findings as official rewards data.
- Stop before giving individualized financial advice beyond category optimization and general education.
- Stop before storing card numbers, credentials, Social Security numbers, or transaction histories.

## Source Index

- [American Express credit cards](https://www.americanexpress.com/us/credit-cards/)
- [American Express Gold](https://www.americanexpress.com/us/credit-cards/card/gold-card/)
- [American Express Platinum](https://www.americanexpress.com/us/credit-cards/card/platinum/)
- [American Express Blue Cash Preferred](https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/)
- [Bank of America credit cards](https://www.bankofamerica.com/credit-cards/)
- [Bank of America Customized Cash Rewards](https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/cash-back-category-choices/)
- [Bank of America Unlimited Cash Rewards](https://www.bankofamerica.com/credit-cards/products/unlimited-cash-back-credit-card/)
- [Capital One compare cards](https://www.capitalone.com/credit-cards/compare/)
- [Capital One Savor](https://www.capitalone.com/credit-cards/savor/)
- [Capital One travel cards](https://www.capitalone.com/credit-cards/travel-and-miles/)
- [Chase Freedom Flex](https://creditcards.chase.com/cash-back-credit-cards/freedom/flex)
- [Chase Freedom Unlimited](https://www.chase.com/personal/credit-cards/freedom/unlimited)
- [Chase Sapphire Preferred](https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred)
- [Chase Sapphire Reserve](https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve)
- [Citi Custom Cash](https://www.citi.com/credit-cards/citi-custom-cash-credit-card)
- [Citi Double Cash](https://www.citi.com/credit-cards/citi-double-cash-credit-card)
- [Citi Strata Premier](https://www.citi.com/credit-cards/citi-strata-premier-credit-card)
- [CFPB agreement database](https://www.consumerfinance.gov/credit-cards/agreements/)
- [Discover credit cards](https://www.discover.com/credit-cards/)
- [Discover 5% calendar](https://www.discover.com/credit-cards/cash-back/cashback-calendar.html)
- [U.S. Bank credit cards](https://www.usbank.com/credit-cards.html)
- [U.S. Bank Smartly](https://www.usbank.com/credit-cards/bank-smartly-visa-signature-credit-card.html)
- [Wells Fargo credit cards](https://creditcards.wellsfargo.com/)
- [Wells Fargo Autograph](https://creditcards.wellsfargo.com/autograph-visa-credit-card/)
