import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: string;
}

export default function FeatureCard({ title, description, icon: Icon, accent = 'text-brand-100' }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-brand-500/50">
      <div className={`mb-3 inline-flex rounded-xl bg-brand-500/10 p-2 ${accent}`}>
        <Icon className="h-4 w-4" />
      </div>
      <h4 className="mb-2 font-semibold text-white">{title}</h4>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
