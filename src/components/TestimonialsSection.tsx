import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The VALP campaign changed how I see myself. I am a catalyst for change in my community.",
    name: "Aisha O.",
    role: "Student, Kaduna",
  },
  {
    quote: "Clean water in our school means our children no longer fall sick weekly. WWF gave us hope.",
    name: "Mr. Bature",
    role: "Headteacher, Plateau",
  },
  {
    quote: "Partnering with Water and Wisdom Foundation has been one of our most impactful collaborations.",
    name: "Mrs. Adeyemi",
    role: "Partner Organisation Lead",
  },
  {
    quote: "I learned that values shape leadership. Today, I lead my class with integrity.",
    name: "Chinedu E.",
    role: "Student, Enugu",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            Voices of Impact
          </h2>
          <p className="text-muted-foreground font-body">
            Hear from the students, educators, and partners shaping our movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-card border border-border rounded-lg p-6 shadow-sm"
            >
              <Quote className="absolute top-4 right-4 text-accent/30" size={32} />
              <p className="font-body text-foreground/90 leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <footer>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
