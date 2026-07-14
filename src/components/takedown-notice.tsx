import Link from "next/link";
import { AlertTriangle, Database, ImageOff, ShieldCheck } from "lucide-react";

type TakedownNoticeProps = {
  requestedSurface?: string;
};

export function TakedownNotice({ requestedSurface = "MVP" }: TakedownNoticeProps) {
  return (
    <main className="takedown-shell">
      <section className="takedown-panel" aria-labelledby="takedown-title">
        <div className="takedown-status">
          <AlertTriangle size={20} />
          Temporarily offline
        </div>
        <h1 id="takedown-title">Card Compass is paused for data and image cleanup.</h1>
        <p>
          The {requestedSurface} is intentionally hidden because the current prototype has uneven
          card image quality and incomplete coverage for some cards.
        </p>

        <div className="issue-list" aria-label="Why the MVP is offline">
          <div>
            <ImageOff size={22} />
            <strong>Card images are not consistent enough.</strong>
            <span>Some cards use official artwork, while others still fall back to generated UI.</span>
          </div>
          <div>
            <Database size={22} />
            <strong>Card records need a stricter completeness gate.</strong>
            <span>Every public card should have verified rewards, caveats, sources, and artwork status.</span>
          </div>
          <div>
            <ShieldCheck size={22} />
            <strong>The no-bank-login direction stays.</strong>
            <span>The next version should reopen only after the data and visual pipeline is trustworthy.</span>
          </div>
        </div>

        <div className="next-steps" id="data-refresh-plan">
          <h2>Before reopening</h2>
          <ol>
            <li>Define required fields for every public card.</li>
            <li>Mark cards as publishable only after source and artwork checks pass.</li>
            <li>Normalize card image aspect ratio, resolution, and source metadata.</li>
            <li>Hide cards without complete data or approved artwork from public recommendations.</li>
          </ol>
        </div>

        <div className="offline-links">
          <Link className="secondary-button" href="/">
            Back to status
          </Link>
          <span className="text-link">Plan and source data remain in repo</span>
        </div>
      </section>
    </main>
  );
}
