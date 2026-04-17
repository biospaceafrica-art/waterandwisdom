import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import impactStudentsHall from "@/assets/impact-students-hall.jpg";
import impactNotebook from "@/assets/impact-notebook-distribution.jpg";
import impactCatalystGirl from "@/assets/impact-catalyst-girl.jpg";
import impactValpSpeaker from "@/assets/impact-valp-speaker.jpg";
import impactStrivingGirl from "@/assets/impact-striving-girl.jpg";
import heroCleanWater from "@/assets/hero-clean-water.jpg";
import heroSchoolAerial from "@/assets/hero-school-aerial.jpg";
import heroValpTeam from "@/assets/hero-valp-team.jpg";
import heroSchoolSession from "@/assets/hero-school-session.jpg";
import heroStudentsAdvocacy from "@/assets/hero-students-advocacy.jpg";
import heroVideoWater from "@/assets/hero-video-water.mp4.asset.json";

type Slide = {
  image: string;
  video?: string;
  alt: string;
  headline: string;
  caption: string;
};

const slides: Slide[] = [
  {
    image: heroCleanWater,
    video: heroVideoWater.url,
    alt: "Children celebrating clean water from a new borehole",
    headline: "Clean Water Changes Everything",
    caption: "Providing safe drinking water to rural communities across Nigeria",
  },
  {
    image: impactStudentsHall,
    alt: "Excited students during a VALP campaign session",
    headline: "Igniting Values in Young Minds",
    caption: "850+ students reached with values-based leadership in 2024",
  },
  {
    image: heroSchoolSession,
    alt: "Facilitator engaging hundreds of students in a school session",
    headline: "Education That Transforms",
    caption: "Interactive sessions building critical thinking across 14 schools",
  },
  {
    image: heroSchoolAerial,
    alt: "Aerial view of students gathered in a school courtyard",
    headline: "A Movement Across States",
    caption: "VALP campaigns spanning 5 states and growing every year",
  },
  {
    image: impactCatalystGirl,
    alt: "Student holding 'I Am a Catalyst for Change' card",
    headline: "Catalysts for Change",
    caption: "Every child a leader — 116 documented values-based decisions",
  },
  {
    image: heroValpTeam,
    alt: "VALP facilitators and teachers at a leadership training event",
    headline: "Empowering Educators",
    caption: "Training teachers to embed values in every classroom",
  },
  {
    image: heroStudentsAdvocacy,
    alt: "Students holding advocacy signs for better education",
    headline: "Student Voices Rising",
    caption: "Young advocates speaking up for quality education reform",
  },
  {
    image: impactValpSpeaker,
    alt: "VALP facilitator engaging students in values-based leadership",
    headline: "Leadership Rooted in Purpose",
    caption: "VALP campaigns across 14 schools in 3+ states",
  },
  {
    image: impactNotebook,
    alt: "Branded notebook distribution to students across schools",
    headline: "Tools for Learning",
    caption: "500 branded notebooks empowering students across 4 schools",
  },
  {
    image: impactStrivingGirl,
    alt: "Student holding 'Striving for A+ in Every Endeavour' message",
    headline: "Striving for Excellence",
    caption: "Building a generation that leads with integrity and ambition",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [metrics, setMetrics] = useState({ donors: 0, totalRaised: 0 });

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await supabase.from("donations").select("amount, user_id");
      if (data) {
        const total = data.reduce((s, d) => s + Number(d.amount), 0);
        const uniqueDonors = new Set(data.map((d) => d.user_id).filter(Boolean)).size;
        setMetrics({ donors: uniqueDonors, totalRaised: total });
      }
    };
    fetchMetrics();

    const channel = supabase
      .channel("hero-donations")
      .on("postgres_changes", { event: "*", schema: "public", table: "donations" }, () => fetchMetrics())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const formatCurrency = (val: number) =>
    val >= 1_000_000 ? `₦${(val / 1_000_000).toFixed(1)}M`
    : val >= 1_000 ? `₦${(val / 1_000).toFixed(0)}K`
    : `₦${val.toLocaleString()}`;

  return (
    <section
      className="relative h-[90vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image or video */}
      <AnimatePresence mode="wait">
        {slides[current].video ? (
          <motion.video
            key={`v-${current}`}
            src={slides[current].video}
            poster={slides[current].image}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label={slides[current].alt}
          />
        ) : (
          <motion.img
            key={`i-${current}`}
            src={slides[current].image}
            alt={slides[current].alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Where Clean Water{" "}
              <span className="text-accent">Meets Education.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-body mb-4 max-w-xl leading-relaxed">
              Transforming lives through water, education, and values-driven leadership across Nigeria.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="font-heading font-semibold text-accent text-lg md:text-xl">{slides[current].headline}</p>
                <p className="text-white/60 text-sm font-heading mt-1">{slides[current].caption}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: metrics.totalRaised > 0 ? formatCurrency(metrics.totalRaised) : "14+", label: metrics.totalRaised > 0 ? "Raised" : "Schools" },
                { value: metrics.donors > 0 ? `${metrics.donors}+` : "3,200+", label: metrics.donors > 0 ? "Donors" : "Students" },
                { value: "5", label: "States" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <p className="font-heading font-extrabold text-2xl md:text-3xl text-accent">{stat.value}</p>
                  <p className="text-xs text-white/60 font-heading uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-wwf-amber hover:bg-wwf-amber/90 text-foreground font-heading font-semibold text-base px-8" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-base px-8" asChild>
                <Link to="/contact">Partner With Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "bg-accent w-7" : "bg-white/30 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white/10">
        <motion.div
          key={`${current}-${isPaused}`}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-accent/60"
        />
      </div>
    </section>
  );
}
