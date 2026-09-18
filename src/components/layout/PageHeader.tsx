import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="blueprint relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-saffron-deep">{eyebrow}</p>
          <h1 className="display display-xl mt-5 max-w-3xl text-ink">{title}</h1>
          {lead && (
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">{lead}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
