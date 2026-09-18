import Link from "next/link";

export default function NotFound() {
  return (
    <section className="blueprint flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="eyebrow text-saffron-deep">404 — Page Not Found</p>
      <h1 className="display display-lg mt-5 max-w-lg text-ink">
        This dish isn&apos;t on the <em className="text-saffron-deep">menu.</em>
      </h1>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
        The page you&apos;re looking for has moved or never existed. Let&apos;s
        get you back to the good table.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-6">
        <Link href="/" className="btn-solid">
          Back to Home
        </Link>
        <Link href="/contact" className="link-underline self-center text-ink">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
