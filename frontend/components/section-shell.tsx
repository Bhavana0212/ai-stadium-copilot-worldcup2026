interface SectionShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionShell({ title, subtitle, children }: SectionShellProps) {
  return (
    <section className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
