import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chidinma Okafor",
    role: "Community Health Volunteer",
    location: "Abia State",
    quote:
      "Seeing children drink clean water for the first time — their faces light up. That moment keeps me going every single day.",
    avatar: "CO",
  },
  {
    name: "Emeka Nwosu",
    role: "Education Mentor",
    location: "Enugu State",
    quote:
      "I was once a student in this programme. Now I teach the next generation. The cycle of impact never stops.",
    avatar: "EN",
  },
  {
    name: "Fatima Bello",
    role: "WASH Programme Coordinator",
    location: "Cross River State",
    quote:
      "Every borehole we install transforms an entire village. Girls return to school, families stay healthy, communities thrive.",
    avatar: "FB",
  },
  {
    name: "Adebayo Ogundimu",
    role: "Youth Leadership Coach",
    location: "Akwa Ibom State",
    quote:
      "We don't just teach values — we live them. These young people are becoming the leaders Nigeria deserves.",
    avatar: "AO",
  },
  {
    name: "Ngozi Eze",
    role: "Field Operations Volunteer",
    location: "Ebonyi State",
    quote:
      "The gratitude in a mother's eyes when her child can finally attend school without walking miles for water — that's everything.",
    avatar: "NE",
  },
];

export function VolunteerCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <span className="font-heading text-xs uppercase tracking-widest text-secondary font-semibold">
            Volunteer Voices
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3">
            Stories From the Field
          </h2>
        </div>

        <div className="relative">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center text-center">
            <Quote className="text-secondary/30 mb-6" size={40} />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-body italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-secondary text-sm">{t.avatar}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-secondary w-8" : "bg-border"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
