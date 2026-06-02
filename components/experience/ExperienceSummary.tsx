const stats = [
  { value: "21s → 250ms", label: "Core API latency" },
  { value: "40%", label: "Off API p95 latency" },
  { value: "99.99%", label: "Pipeline uptime" },
] as const;

export default function ExperienceSummary() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-3 gap-4 border-y border-border py-8 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-[clamp(1.5rem,4vw,1.875rem)] italic leading-none text-text">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-muted sm:text-[11px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
