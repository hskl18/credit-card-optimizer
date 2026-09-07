export const siteName = "Credit Card Optimizer";

export const siteDescription =
  "Which credit card to use for every purchase, in dollars. Points and cash back " +
  "are converted to one number so 4x and 6% compare directly.";

/** Vercel exposes the deploy host at build time, so nothing has to be configured. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
