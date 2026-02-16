import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";

const sdgs = [
  { number: 4, title: "Quality Education", desc: "Ensuring inclusive and equitable quality education." },
  { number: 6, title: "Clean Water & Sanitation", desc: "Ensuring access to water and sanitation for all." },
  { number: 9, title: "Industry & Innovation", desc: "Building resilient infrastructure." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={aboutHero} alt="Nigerian community with water borehole" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground mb-4">About Us</h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl">
                A faith-based NGO transforming communities across Nigeria through integrated water, education, and leadership programmes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-heading font-bold text-xl text-secondary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A Nigeria where every child has access to clean water, quality education, and the values needed to lead with integrity and purpose.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-heading font-bold text-xl text-wwf-amber mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver integrated water, education, and leadership development programmes that empower communities and build resilient futures for Nigeria's children.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* States Map */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Where We Work</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">Active in 5 states across southeastern Nigeria</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {["Cross River", "Akwa Ibom", "Abia", "Enugu", "Ebonyi"].map((state, i) => (
              <motion.div
                key={state}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg px-6 py-4 shadow-sm"
              >
                <span className="font-heading font-semibold text-foreground">{state}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Global Alignment</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">Our programmes directly contribute to the UN Sustainable Development Goals.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sdgs.map((sdg, i) => (
              <motion.div
                key={sdg.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-xl text-secondary">#{sdg.number}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{sdg.title}</h3>
                <p className="text-sm text-muted-foreground">{sdg.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
