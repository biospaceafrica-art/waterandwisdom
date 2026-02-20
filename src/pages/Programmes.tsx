import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Droplets, GraduationCap, Compass, ArrowRight, Target } from "lucide-react";

const programmes = [
  {
    icon: Droplets,
    title: "End Water Crisis Initiative",
    tag: "WASH",
    description: "Our WASH programme provides boreholes, water filtration systems, and hygiene education to rural communities. We work alongside local governments to ensure long-term maintenance and sustainability.",
    activities: ["Borehole drilling & rehabilitation", "Community hygiene training", "School WASH facilities", "Water quality monitoring"],
    targets2026: [
      { indicator: "WASH Projects", target: "2 states" },
      { indicator: "Beneficiaries", target: "1,500+" },
      { indicator: "Hygiene Campaigns", target: "2" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Sustainable Education Support",
    tag: "Education",
    description: "We strengthen schools through infrastructure support, learning materials, teacher training, and scholarship programmes for underserved students — particularly girls.",
    activities: ["Classroom renovation", "Learning materials supply", "Teacher development", "Girls' scholarship fund"],
    targets2026: [
      { indicator: "Schools Engaged", target: "14+" },
      { indicator: "Students Reached", target: "4,000+" },
      { indicator: "Learning Materials", target: "Distributed" },
    ],
  },
  {
    icon: Compass,
    title: "Values & Leadership Programme (VALP)",
    tag: "Leadership",
    description: "VALP equips young Nigerians with moral reasoning, civic responsibility, and practical leadership skills through mentoring, workshops, and community projects.",
    activities: ["Mentorship circles", "Leadership workshops", "Community service projects", "Annual Leadership Summit"],
    targets2026: [
      { indicator: "VALP Campaigns", target: "10 schools" },
      { indicator: "Leadership Clubs", target: "10" },
      { indicator: "Student Leaders Trained", target: "300+" },
      { indicator: "Prefect Summit", target: "1 (Cross River)" },
    ],
  },
];

const Programmes = () => {
  return (
    <Layout>
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
              Integrated. Community-Centred. Measurable.
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our three interconnected programmes address the root causes of poverty and create pathways to dignity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16 max-w-5xl mx-auto">
            {programmes.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <prog.icon className="text-secondary" size={32} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="inline-block font-heading text-xs uppercase tracking-widest text-secondary font-semibold bg-secondary/10 px-3 py-1 rounded-full mb-3">
                      {prog.tag}
                    </span>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">{prog.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{prog.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {prog.activities.map((act) => (
                        <div key={act} className="flex items-center gap-2 text-sm text-foreground">
                          <ArrowRight size={14} className="text-secondary shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>

                    {/* 2026 Targets */}
                    <div className="bg-muted rounded-xl p-5 border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Target size={16} className="text-secondary" />
                        <span className="font-heading font-semibold text-sm text-foreground">2026 Targets</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {prog.targets2026.map((t) => (
                          <div key={t.indicator} className="flex justify-between text-sm px-3 py-2 bg-card rounded-lg">
                            <span className="text-muted-foreground">{t.indicator}</span>
                            <span className="font-heading font-semibold text-secondary">{t.target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programmes;
