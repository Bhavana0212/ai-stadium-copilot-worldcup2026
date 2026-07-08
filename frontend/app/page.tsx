"use client";

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Bus,
  Droplets,
  HeartPulse,
  Menu,
  Sparkles,
  TrainFront,
  Zap,
  Languages,
  Car,
  Trees,
  Headphones,
  ScanSearch,
  BadgeCheck,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import FeatureCard from '@/components/feature-card';
import SectionShell from '@/components/section-shell';
import { accessibilityItems, fanCards, operationsCards, stadiumData, sustainabilityMetrics, transportOptions } from '@/lib/stadium-data';
import { getGeminiReply } from '@/services/gemini';
import type { ChatMessage, MetricCard, StadiumData } from '@/types/dashboard';

const metrics: MetricCard[] = [
  { title: 'Live Crowd', value: '68%', trend: '+4% vs. baseline', accent: 'from-brand-500 to-cyan-400' },
  { title: 'Queue Time', value: '13 min', trend: 'Stable', accent: 'from-amber-400 to-orange-500' },
  { title: 'Incident Alerts', value: '2 active', trend: '1 resolved', accent: 'from-emerald-500 to-lime-400' },
  { title: 'Carbon Saved', value: '18%', trend: 'Shift to transit', accent: 'from-fuchsia-500 to-violet-500' },
];

const chartData = [
  { name: 'Gate A', value: 72 },
  { name: 'Gate B', value: 58 },
  { name: 'Concourse', value: 89 },
  { name: 'Food Hall', value: 66 },
  { name: 'Exit', value: 41 },
];

const dashboardSections = [
  { title: 'Operations', icon: BrainCircuit, text: 'Crowd density, queue analytics, and safe incident handling.' },
  { title: 'Accessibility', icon: HeartPulse, text: 'Voice support, language toggles, and assistive navigation.' },
  { title: 'Sustainability', icon: Zap, text: 'Energy use, waste control, and transit recommendations.' },
  { title: 'Transport', icon: Bus, text: 'Shuttles, parking, and public transit guidance.' },
];

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Welcome to AI Stadium Copilot. Ask me about your seat, accessibility support, transport, or emergency help.',
    },
  ]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [language, setLanguage] = useState('English');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const userMessage = { id: Date.now(), role: 'user' as const, content: draft.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setIsLoading(true);

    try {
      const reply = await getGeminiReply(`${userMessage.content} Respond in ${language} and include accessibility, transportation, or urgent guidance when relevant.`);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, role: 'assistant', content: 'The assistant is currently unavailable. Please try again in a moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const aiSummary = useMemo(() => {
    return `Current operations are stable. ${stadiumData.liveCrowd} fans are inside and the busiest zone is the food hall.`;
  }, []);

  const currentStadium: StadiumData = {
    ...stadiumData,
  };

  return (
    <main className="min-h-screen bg-transparent p-4 text-slate-100 md:p-6 lg:p-8" style={{ fontSize: `${fontScale}rem` }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[32px] border border-slate-800/80 bg-slate-900/70 p-4 shadow-glow backdrop-blur xl:p-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/70 px-4 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-brand-100">
              <Sparkles className="h-4 w-4" /> FIFA World Cup 2026
            </div>
            <h1 className="text-2xl font-semibold text-white">AI Stadium Copilot</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
              <Languages className="h-4 w-4" /> {language}
            </div>
            <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-brand-500 hover:text-white" onClick={() => setFontScale((value) => (value < 1.2 ? value + 0.05 : value))}>
              <ScanSearch className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-brand-500 hover:text-white" onClick={() => setFontScale(1)}>
              <BadgeCheck className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-brand-500 hover:text-white" onClick={() => setLanguage('Español')}>
              <Languages className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-brand-500 hover:text-white lg:hidden" onClick={() => setMobileNavOpen((value) => !value)}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        {mobileNavOpen ? (
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">Quick navigation</p>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">Live</span>
            </div>
            <div className="grid gap-2 text-sm text-slate-300">
              {['Assistant', 'Fan Dashboard', 'Operations', 'Accessibility', 'Sustainability', 'Transport'].map((item) => (
                <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 lg:flex">
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-100">
                <BrainCircuit className="h-4 w-4" /> Live Command Center
              </div>
              <p className="text-sm text-slate-400">Real-time fan guidance, operations intelligence, and sustainability insights.</p>
            </div>
            <nav className="space-y-2 text-sm text-slate-300">
              {['Assistant', 'Fan Dashboard', 'Operations', 'Accessibility', 'Sustainability', 'Transport'].map((item) => (
                <div key={item} className="rounded-xl border border-transparent px-3 py-2 transition hover:border-slate-700 hover:bg-slate-800/70">
                  {item}
                </div>
              ))}
            </nav>
            <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-400">
              <div className="mb-2 flex items-center gap-2 text-slate-200">
                <TrainFront className="h-4 w-4" /> Transit pulse
              </div>
              <p>Shuttle load is at 81% and parking lots B and C remain open.</p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-brand-600/30 to-slate-950 p-5 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Smart stadium at a glance</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">{currentStadium.name}</h2>
                  </div>
                  <div className="rounded-full border border-brand-400/30 bg-white/10 px-3 py-1 text-sm text-brand-100">Live • 4 mins ago</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-3">
                    <p className="text-sm text-slate-400">Capacity</p>
                    <p className="mt-1 text-xl font-semibold">{currentStadium.capacity}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-3">
                    <p className="text-sm text-slate-400">Inside now</p>
                    <p className="mt-1 text-xl font-semibold">{currentStadium.liveCrowd}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-3">
                    <p className="text-sm text-slate-400">Queue time</p>
                    <p className="mt-1 text-xl font-semibold">{currentStadium.queueTime}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">AI Summary</h3>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Optimized</div>
                </div>
                <p className="text-sm leading-6 text-slate-400">{aiSummary}</p>
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-300">
                  <div className="mb-2 flex items-center gap-2 text-brand-100">
                    <Droplets className="h-4 w-4" /> Fan sentiment
                  </div>
                  <p>Positive sentiment remains high with strong demand for multilingual support and clearer delivery guidance.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.title} className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4">
                  <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${metric.accent}`} />
                  <p className="text-sm text-slate-400">{metric.title}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.trend}</p>
                </div>
              ))}
            </div>

            <SectionShell title="Fan Dashboard" subtitle="Matchday journey and wayfinding">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {fanCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                    <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${card.accent}`} />
                    <h4 className="mb-2 font-semibold text-white">{card.title}</h4>
                    <p className="text-sm leading-6 text-slate-400">{card.description}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell title="Operations Dashboard" subtitle="Crowd insight and incident flow">
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-3 md:grid-cols-2">
                  {operationsCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                      <p className="text-sm text-slate-400">{card.title}</p>
                      <p className="mt-1 text-2xl font-semibold text-white">{card.value}</p>
                      <p className="mt-2 text-sm text-slate-500">{card.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="h-56 rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#0f6fff" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </SectionShell>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <SectionShell title="Accessibility Center" subtitle="Support for every fan">
                <div className="space-y-3">
                  {accessibilityItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                      <div className="rounded-xl bg-brand-500/10 p-2 text-brand-100">
                        <Headphones className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionShell>

              <SectionShell title="AI Stadium Assistant" subtitle="Multilingual • Accessible • Fast">
                <div className="mb-4 space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="min-h-24 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
                    placeholder="Ask about transportation, emergency guidance, accessibility routes, or seating..."
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-slate-500">Sample: “Where is the nearest accessible restroom?”</div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? 'Thinking…' : 'Send'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </SectionShell>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <SectionShell title="Sustainability Dashboard" subtitle="Energy, waste, and carbon impact">
                <div className="grid gap-3">
                  {sustainabilityMetrics.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                      <div className="mb-2 flex items-center gap-2 text-brand-100">
                        <Trees className="h-4 w-4" />
                        <p className="font-medium text-white">{item.label}</p>
                      </div>
                      <p className="text-2xl font-semibold text-white">{item.value}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </SectionShell>

              <SectionShell title="Transportation Assistant" subtitle="Shuttles, parking, and public transit">
                <div className="grid gap-3">
                  {transportOptions.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                      <div className="mb-2 flex items-center gap-2 text-brand-100">
                        <Car className="h-4 w-4" />
                        <p className="font-medium text-white">{item.label}</p>
                      </div>
                      <p className="text-sm text-slate-400">{item.detail}</p>
                      <p className="mt-2 text-sm text-emerald-300">{item.status}</p>
                    </div>
                  ))}
                </div>
              </SectionShell>
            </div>

            <SectionShell title="Experience Modules" subtitle="Each area of the stadium is covered by AI support">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {dashboardSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <FeatureCard key={section.title} title={section.title} description={section.text} icon={Icon} />
                  );
                })}
              </div>
            </SectionShell>
          </section>
        </div>
      </div>
    </main>
  );
}
