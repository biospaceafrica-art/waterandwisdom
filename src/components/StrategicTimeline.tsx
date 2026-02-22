import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, GraduationCap, Compass, Calendar } from "lucide-react";

type Pillar = "all" | "WASH" | "VALP" | "Education";

interface Milestone {
  year: string;
  title: string;
  description: string;
  pillar: "WASH" | "VALP" | "Education";
  metrics?: string;
}

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "End Water Crisis Initiative Launched",
    description: "Installation of a functional hand-pump borehole at Oberiakia Community, Akamkpa LGA, Cross River State.",
    pillar: "WASH",
    metrics: "SDG 6 · Community households benefited",
  },
  {
    year: "2023",
    title: "First VALP Signboard Erected",
    description: "Project signboard erected at Oberiakia Community marking WWF's presence and commitment to WASH interventions.",
    pillar: "WASH",
  },
  {
    year: "2024",
    title: "Catalysts for Change Campaign",
    description: "VALP campaigns across 10 schools in Cross River and Akwa Ibom States, reaching 1,700+ students with values-based messaging.",
    pillar: "VALP",
    metrics: "52 documented decisions · 300 branded materials distributed",
  },
  {
    year: "2024",
    title: "Governance & Accountability Strengthened",
    description: "Independent audit conducted for the 2024 financial year. Total expenditure: ₦852,000.",
    pillar: "Education",
    metrics: "SDG 4 & 6 contribution",
  },
  {
    year: "2025",
    title: "VALP Expands to 4 Schools",
    description: "Campaigns executed in Government Secondary School Akpap Okoyong (CRS), Methodist Boys High School Oron (AKS), Eyo Abasi Community Secondary School Oron (AKS), and Government Secondary School Ikot Ansa Calabar (CRS).",
    pillar: "VALP",
    metrics: "1,500+ students · 64 documented decisions · 500 branded notebooks",
  },
  {
    year: "2025",
    title: "Education Materials Distribution",
    description: "500 branded notebooks and pens distributed to students across 4 schools in Cross River and Akwa Ibom States.",
    pillar: "Education",
    metrics: "Total expenditure (2025): ₦530,000",
  },
  {
    year: "2026",
    title: "Scale to Five States",
    description: "Strategic goal to expand VALP reach to 10 schools across 5 states with 4,000+ students and 10 leadership clubs.",
    pillar: "VALP",
    metrics: "Target: 4,000+ students · 10 leadership clubs",
  },
  {
    year: "2026",
    title: "Prefect Leadership Summit",
    description: "Host a summit training 300+ student leaders from 5 states to build a pipeline of ethically grounded leaders.",
    pillar: "Education",
    metrics: "Target: 300+ student leaders · 5 states",
  },
  {
    year: "2026",
    title: "Scalable WASH Interventions",
    description: "Deliver WASH projects across 2 additional states with 1,500+ beneficiaries and 2 hygiene campaigns.",
    pillar: "WASH",
    metrics: "Target: 1,500+ beneficiaries · 2 hygiene campaigns",
  },
];

const pillarConfig = {
  WASH: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  VALP: { icon: Compass, color: "text-secondary", bg: "bg-secondary/10" },
  Education: { icon: GraduationCap, color: "text-wwf-amber", bg: "bg-wwf-amber/10" },
};

const filters: { key: Pillar; label: string }[] = [
  { key: "all", label: "All Pillars" },
  { key: "WASH", label: "WASH" },
  { key: "VALP", label: "VALP" },
  { key: "Education", label: "Education" },
];

export function StrategicTimeline() {
  const [activePillar, setActivePillar] = useState<Pillar>("all");

  const filtered = activePillar === "all" ? milestones : milestones.filter((m) => m.pillar === activePillar);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-3xl text-foreground mb-3">
            Strategic Timeline 2023–2026
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Key milestones across our three programme pillars.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActivePillar(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all ${
                activePillar === f.key
                  ? "bg-secondary text-secondary-foreground shadow-teal"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {filtered.map((m, i) => {
              const cfg = pillarConfig[m.pillar];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={`${m.year}-${m.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Dot */}
                  <div className={`absolute left-3.5 md:left-5.5 w-5 h-5 rounded-full ${cfg.bg} border-2 border-background flex items-center justify-center`}>
                    <Icon size={10} className={cfg.color} />
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-xs font-heading font-semibold text-muted-foreground">
                        <Calendar size={12} /> {m.year}
                      </span>
                      <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {m.pillar}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                    {m.metrics && (
                      <p className="text-xs text-secondary mt-2 italic">{m.metrics}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
