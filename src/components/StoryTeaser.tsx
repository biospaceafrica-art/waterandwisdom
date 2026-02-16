import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import studentStory from "@/assets/student-story.jpg";

export function StoryTeaser() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={studentStory}
              alt="A confident Nigerian student holding books"
              className="rounded-2xl shadow-warm object-cover w-full aspect-[3/4]"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-wwf-amber/20 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-heading text-xs uppercase tracking-widest text-secondary font-semibold">
              Story of Change
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3 mb-6 leading-tight">
              From walking for water to leading her class
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              When clean water came to her village, Amara no longer spent hours each morning at the river. 
              She returned to school, joined the Values and Leadership Programme, and became the first 
              in her family to sit for her WAEC exams. Today, she mentors younger girls in her community.
            </p>
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 font-heading font-semibold text-secondary hover:text-secondary/80 transition-colors"
            >
              Read Full Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
