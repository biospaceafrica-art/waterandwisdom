import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const reasons = [
  {
    title: "Proven Impact With Modest Resources",
    desc: "₦1.38M invested reaching 3,200+ students — exceptional cost-efficiency that maximises every naira of donor investment.",
  },
  {
    title: "Integrated, Holistic Model",
    desc: "Water, education, and leadership are delivered together — addressing root causes, not just symptoms.",
  },
  {
    title: "Community-Centred Approach",
    desc: "Programmes are designed with communities, not for them. This builds ownership and long-term sustainability.",
  },
  {
    title: "Aligned With SDGs 4, 6 & 9",
    desc: "Our work directly contributes to global development priorities, making your CSR reporting seamless.",
  },
  {
    title: "Transparent Governance",
    desc: "Independent board oversight, annual audits, and a robust MEAL system ensure accountability at every level.",
  },
  {
    title: "Scalable Model",
    desc: "Currently in 5 states with plans to expand to all southeast Nigeria — your partnership accelerates this growth.",
  },
  {
    title: "Values-Driven Leadership Pipeline",
    desc: "VALP is unique in Nigeria — developing ethical leaders who give back to their communities for generations.",
  },
  {
    title: "Faith-Based, Inclusive Practice",
    desc: "Grounded in Christian values while serving all communities without discrimination.",
  },
];

const WhyFundUs = () => {
  return (
    <Layout>
      <section className="py-24 bg-cta-gradient">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground mb-4">Why Fund Us</h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
              8 reasons to partner with the Water and Wisdom Foundation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-5 items-start bg-card border border-border rounded-xl p-6 md:p-8"
              >
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {i + 1}. {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Efficiency Visual */}
      <section className="py-16 bg-stats">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-10">Cost-Efficiency at a Glance</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
            <div className="flex-1 text-center">
              <div className="font-heading font-bold text-4xl text-secondary mb-2">₦1.38M</div>
              <p className="text-sm text-muted-foreground">Total Investment</p>
            </div>
            <div className="text-3xl text-wwf-amber font-heading font-bold">→</div>
            <div className="flex-1 text-center">
              <div className="font-heading font-bold text-4xl text-secondary mb-2">3,200+</div>
              <p className="text-sm text-muted-foreground">Students Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-6">Ready to Make an Impact?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Request a partnership proposal tailored to your organisation's CSR goals.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold px-10" asChild>
            <Link to="/contact">Request a Proposal</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default WhyFundUs;
