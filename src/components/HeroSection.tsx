import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroWater from "@/assets/hero-water.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLeadership from "@/assets/hero-leadership.jpg";

const slides = [
  { image: heroWater, alt: "Children drinking clean water" },
  { image: heroEducation, alt: "Students in classroom" },
  { image: heroLeadership, alt: "Mentor speaking to youth" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current].image}
          alt={slides[current].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6">
              Where Clean Water{" "}
              <span className="text-accent">Meets Education.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-10 max-w-xl leading-relaxed">
              Transforming lives through water, education, and values-driven leadership across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-base px-8"
                asChild
              >
                <Link to="/contact">Partner With Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold text-base px-8"
                asChild
              >
                <Link to="/contact">Support Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-accent w-8" : "bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
