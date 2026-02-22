import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import founderImg from "@/assets/founder.jpeg";
import programmesMgrImg from "@/assets/programmes-manager.jpg";
import reportVision from "@/assets/report-vision.jpg";
import reportBorehole from "@/assets/report-borehole.jpg";
import { MediaGallery } from "@/components/MediaGallery";

const sdgs = [
  { number: 4, title: "Quality Education", desc: "Ensuring inclusive and equitable quality education." },
  { number: 6, title: "Clean Water & Sanitation", desc: "Ensuring access to water and sanitation for all." },
  { number: 9, title: "Industry & Innovation", desc: "Building resilient infrastructure." },
];

const teamMembers = [
  {
    name: "Michael Edwin",
    role: "Founder & Chairman",
    credentials: "FCA, FCTI, CISA",
    image: founderImg,
    bio: "Visionary founder driven by a deep commitment to community transformation, bridging access to clean water and quality education across southeastern Nigeria.",
  },
  {
    name: "Ekuri, Ekuri Asu",
    role: "Programmes Manager",
    image: programmesMgrImg,
    bio: "Leading the operational delivery of WWF's integrated education, leadership, and WASH programmes across multiple states.",
  },
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
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-heading font-bold text-xl text-secondary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A sustainable future where every child and community has access to safe water, quality education, and values-driven leadership.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-heading font-bold text-xl text-wwf-amber mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To transform lives in underserved communities through sustainable water solutions, education support, and leadership development anchored on strong values.
                </p>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={reportVision} alt="Community engagement meeting" className="rounded-2xl w-full shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme Overview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={reportBorehole} alt="Borehole construction in progress" className="rounded-2xl w-full shadow-lg" />
            </motion.div>
            <div>
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Programme Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                WWF delivers impact through three integrated programme pillars prioritising community ownership, school-based interventions, accountability, and alignment with global development best practices.
              </p>
              <div className="space-y-3">
                {["End Water Crisis Initiative (WASH)", "Values, Academics and Leadership Programme (VALP)", "Sustainable Education Support"].map((p) => (
                  <div key={p} className="bg-card border border-border rounded-lg px-5 py-3 font-heading font-semibold text-sm text-foreground">{p}</div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-heading font-semibold text-foreground mb-3">Where We Work</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cross River", "Akwa Ibom", "Abia", "Enugu", "Ebonyi"].map((state) => (
                    <span key={state} className="bg-secondary/10 text-secondary font-heading font-semibold text-xs px-3 py-1.5 rounded-full">{state}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-foreground text-center mb-12">Our Leadership</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded font-heading font-semibold uppercase tracking-wider">
                    {member.role}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-foreground mt-3 mb-1">{member.name}</h3>
                  {member.credentials && (
                    <p className="text-xs text-muted-foreground font-heading mb-2">{member.credentials}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <MediaGallery />

      {/* SDGs */}
      <section className="py-20 bg-muted">
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
