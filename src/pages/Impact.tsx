import { Layout } from "@/components/Layout";
import { StatsSection } from "@/components/StatsSection";
import { InlineDonationForm } from "@/components/InlineDonationForm";
import { StrategicTimeline } from "@/components/StrategicTimeline";
import { motion } from "framer-motion";
import { Shield, BookOpen, Target, Users, Lightbulb, AlertTriangle, Heart, Share2 } from "lucide-react";
import reportGovernance from "@/assets/report-governance.jpg";
import reportStrategy from "@/assets/report-strategy-2026.jpg";
import impactStudentsHall from "@/assets/impact-students-hall.jpg";
import impactNotebook from "@/assets/impact-notebook-distribution.jpg";
import impactValpSpeaker from "@/assets/impact-valp-speaker.jpg";

const stories = [
  {
    image: impactStudentsHall,
    tag: "WASH",
    title: "Clean Water, Renewed Hope",
    excerpt: "Installation of a functional hand-pump borehole at Oberiakia Community, Akamkpa LGA, Cross River State — improving safe water access for households.",
  },
  {
    image: impactValpSpeaker,
    tag: "Leadership",
    title: "Catalysts for Change",
    excerpt: "VALP campaigns across 10 schools in 2024 reached 1,700+ students with 52 documented values-based decisions and 300 branded materials distributed.",
  },
  {
    image: impactNotebook,
    tag: "Education",
    title: "Values in Action — 2025",
    excerpt: "4 schools across CRS and AKS engaged, 1,500+ students reached, 64 decisions documented, and 500 branded notebooks distributed.",
  },
];

const governance = [
  "Functional Board of Trustees",
  "Annual financial audits",
  "Clear separation of governance and management",
  "Child safeguarding and ethical engagement standards",
  "Strong monitoring, evaluation, accountability and learning (MEAL) orientation",
];

const keyLearnings = [
  "School-based interventions are high-impact and scalable",
  "Integrated WASH + education delivers stronger outcomes",
  "Values-based leadership resonates strongly with adolescents",
];

const challenges = [
  "Limited funding affecting scale",
  "Logistics across multiple states",
  "Infrastructure gaps in public schools",
];

const crossCutting = [
  { icon: Heart, label: "Gender and inclusion" },
  { icon: Shield, label: "Child safeguarding" },
  { icon: Users, label: "Community ownership" },
  { icon: Lightbulb, label: "Environmental sustainability" },
  { icon: BookOpen, label: "Faith-sensitive but globally compliant programming" },
];

const strategicObjectives = [
  {
    title: "Expand VALP Reach Across Five States",
    targets: [
      { indicator: "VALP Campaigns", target: "10 schools" },
      { indicator: "States Covered", target: "5 states" },
      { indicator: "Students Reached", target: "4,000+" },
      { indicator: "Leadership Clubs", target: "10" },
    ],
    outcome: "Improved leadership capacity, academic motivation, and value orientation among adolescents.",
  },
  {
    title: "Host Prefect Leadership Summit",
    targets: [
      { indicator: "Summit Hosted", target: "1" },
      { indicator: "Student Leaders Trained", target: "300+" },
      { indicator: "States Represented", target: "5" },
    ],
    outcome: "A pipeline of ethically grounded student leaders equipped for school and community leadership.",
  },
  {
    title: "Deliver Scalable WASH Interventions",
    targets: [
      { indicator: "WASH Projects", target: "2 states" },
      { indicator: "Beneficiaries", target: "1,500+" },
      { indicator: "Hygiene Campaigns", target: "2" },
    ],
    outcome: "Improved access to clean water and hygiene awareness in schools and communities.",
  },
  {
    title: "Strengthen Institutional Capacity",
    targets: [
      { indicator: "Partnership Development", target: "Corporates, INGOs, MDAs" },
      { indicator: "M&E Framework", target: "Established" },
      { indicator: "Digital Documentation", target: "Active" },
    ],
    outcome: "WWF positioned for partnerships with UNICEF, World Bank-aligned programmes, and CSR platforms.",
  },
];

const Impact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
              Aggregated Impact (2023–2025)
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Real results from cost-effective, high-impact interventions aligned with global development priorities.
            </p>
          </motion.div>
        </div>
      </section>

      <StatsSection />

      {/* Stories of Change */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-12">Stories of Change</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stories.map((story, i) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-warm transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block font-heading text-xs uppercase tracking-widest text-secondary font-semibold bg-secondary/10 px-3 py-1 rounded-full mb-3">{story.tag}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{story.excerpt}</p>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${story.title}: ${story.excerpt} — Learn more at waterandwisdom.lovable.app/impact`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-secondary hover:text-secondary/80 transition-colors"
                  >
                    <Share2 size={14} /> Share on WhatsApp
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Donation Form */}
      <InlineDonationForm />

      {/* Governance */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-8">
                Governance, Transparency & Safeguarding
              </h2>
              <ul className="space-y-4 mb-6">
                {governance.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Shield size={18} className="text-secondary shrink-0 mt-1" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-primary-foreground/70">Total Expenditure (2024): ₦852,000 · SDG Contribution: SDGs 4 & 6</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={reportGovernance} alt="Audited Financial Reports" className="rounded-2xl w-full shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Learnings & Challenges */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
                <Lightbulb size={24} className="text-secondary" /> Key Learnings
              </h3>
              <ul className="space-y-3">
                {keyLearnings.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-secondary mt-1.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle size={24} className="text-wwf-amber" /> Challenges
              </h3>
              <ul className="space-y-3">
                {challenges.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-wwf-amber mt-1.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Timeline */}
      <StrategicTimeline />

      {/* 2026 Strategic Objectives */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-4">
              2026 Strategic Objectives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measurable outcomes driving our next phase of growth and impact.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {strategicObjectives.map((obj, i) => (
              <motion.div
                key={obj.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target size={20} className="text-secondary" />
                  <h3 className="font-heading font-bold text-lg text-foreground">{obj.title}</h3>
                </div>
                <div className="overflow-hidden rounded-lg border border-border mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="text-left px-4 py-2 font-heading font-semibold">Indicator</th>
                        <th className="text-left px-4 py-2 font-heading font-semibold">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {obj.targets.map((t, j) => (
                        <tr key={t.indicator} className={j % 2 === 0 ? "bg-muted/50" : "bg-card"}>
                          <td className="px-4 py-2 text-foreground font-medium">{t.indicator}</td>
                          <td className="px-4 py-2 text-muted-foreground">{t.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-secondary italic">{obj.outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Cutting Priorities */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl text-foreground mb-12">Cross-Cutting Priorities</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {crossCutting.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl px-6 py-5 flex items-center gap-3 shadow-sm"
              >
                <item.icon size={20} className="text-secondary shrink-0" />
                <span className="font-heading font-semibold text-sm text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Intent 2026 */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={reportStrategy} alt="Strategic Intent for 2026 — community facilitator" className="rounded-2xl w-full shadow-lg" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-4">Strategic Intent for 2026</h2>
              <p className="text-secondary font-heading font-semibold mb-3">Theme: Scaling Impact, Deepening Sustainability, Strengthening Partnerships</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To scale WWF's integrated education, leadership, and WASH interventions across five states while strengthening systems, partnerships, and sustainability.
              </p>
              <a href="/contact" className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold px-10 py-3 rounded-lg transition-colors">
                Partner With Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion CTA */}
      <section className="py-20 bg-cta-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-6">
              Partnership Invitation
            </h2>
            <p className="text-primary-foreground/85 text-lg leading-relaxed mb-8">
              The Water and Wisdom Foundation has demonstrated credible impact between 2023 and 2025 through cost-effective, high-impact interventions aligned with global development priorities. With structured governance, measurable outcomes, and a clear 2026 strategy, WWF is well-positioned for scaled partnerships.
            </p>
            <a href="/contact" className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold px-10 py-3 rounded-lg transition-colors">
              Partner With Us
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
