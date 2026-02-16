import { Layout } from "@/components/Layout";
import { StatsSection } from "@/components/StatsSection";
import { motion } from "framer-motion";
import heroWater from "@/assets/hero-water.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLeadership from "@/assets/hero-leadership.jpg";

const stories = [
  {
    image: heroWater,
    tag: "WASH",
    title: "Clean Water, Renewed Hope",
    excerpt: "A community in Cross River State now has 24/7 access to clean water, reducing waterborne diseases by 70%.",
  },
  {
    image: heroEducation,
    tag: "Education",
    title: "Classrooms That Inspire",
    excerpt: "Renovated classrooms and new learning materials led to a 40% improvement in test scores across partner schools.",
  },
  {
    image: heroLeadership,
    tag: "Leadership",
    title: "Tomorrow's Leaders Today",
    excerpt: "VALP graduates are starting community projects and mentoring younger students across five states.",
  },
];

const Impact = () => {
  return (
    <Layout>
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">Impact & Stories</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Real results. Real lives. See how your support makes a difference.
            </p>
          </motion.div>
        </div>
      </section>

      <StatsSection />

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
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block font-heading text-xs uppercase tracking-widest text-secondary font-semibold bg-secondary/10 px-3 py-1 rounded-full mb-3">
                    {story.tag}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{story.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
