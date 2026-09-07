import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="head">
        <span className="label">Not found</span>
      </div>
      <p className="empty">That page does not exist.</p>
      <div className="links">
        <Link href="/">Best by category</Link>
        <Link href="/cards">All cards</Link>
      </div>
    </>
  );
}
