interface ExperienceSummaryProps {
  professional: number;
  internship: number;
  total: number;
}

export default function ExperienceSummary({
  professional,
  internship,
  total,
}: ExperienceSummaryProps) {
  return (
    <section className="mb-16 text-center">
      <div className="inline-flex items-center gap-8 p-8 rounded-2xl border border-border/30 bg-background/50">
        <div className="text-center">
          <div className="text-4xl font-extralight text-text mb-2">{professional}</div>
          <div className="text-sm font-thin text-text/70">Years Professional</div>
        </div>
        <div className="w-px h-12 bg-border/50"></div>
        <div className="text-center">
          <div className="text-4xl font-extralight text-text mb-2">{internship}</div>
          <div className="text-sm font-thin text-text/70">Years Internship</div>
        </div>
        <div className="w-px h-12 bg-border/50"></div>
        <div className="text-center">
          <div className="text-4xl font-extralight text-text mb-2">{total}</div>
          <div className="text-sm font-thin text-text/70">Total Experience</div>
        </div>
      </div>
    </section>
  );
}