import { Droplets, GraduationCap, Compass } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Droplets,
    title: "Clean Water",
    description: "Providing safe, accessible water sources to underserved communities across five Nigerian states.",
  },
  {
    icon: GraduationCap,
    title: "Quality Education",
    description: "Supporting schools with resources, infrastructure, and teacher development for lasting impact.",
  },
  {
    icon: Compass,
    title: "Strong Values",
    description: "Building the next generation of leaders through our Values and Leadership Programme (VALP).",
  },
];

export function PillarsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
          Clean Water. Quality Education. Strong Values.
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          In Nigeria, these are the foundations of human dignity. We deliver them together.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card rounded-xl p-8 border border-border hover:shadow-warm transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <pillar.icon className="text-secondary" size={28} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
