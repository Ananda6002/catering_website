const values = [
  "Seasonal Menus",
  "Live Counters",
  "Gracious Service",
  "Chef-Led Tastings",
  "Full Kitchen On Site",
  "Trusted Since 2014",
];

export function ValuesMarquee() {
  const row = (
    <>
      {values.map((v) => (
        <span key={v} className="flex items-center gap-8 pr-8">
          <span className="display text-2xl italic text-cream/90 sm:text-3xl">{v}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-saffron" />
        </span>
      ))}
    </>
  );

  return (
    <section aria-hidden="true" className="grain relative overflow-hidden border-y border-cream/10 bg-espresso py-6">
      <div className="marquee-track">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </section>
  );
}
