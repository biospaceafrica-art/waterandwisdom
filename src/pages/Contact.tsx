import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, Clock, CheckCircle, Star } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    type: "General",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi, I'm ${formData.name}${formData.organization ? ` from ${formData.organization}` : ""}. [${formData.type}] ${formData.message}`
    );
    window.open(`https://wa.me/2348069387354?text=${message}`, "_blank");
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="font-heading font-extrabold text-4xl text-foreground mb-6">Get in Touch</h1>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Whether you're interested in partnering, donating, volunteering, or simply learning more — we'd love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">Email</p>
                    <a href="mailto:waterandwisdomfoundation@gmail.com" className="text-sm text-muted-foreground hover:text-secondary transition-colors">waterandwisdomfoundation@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">Phone / WhatsApp</p>
                    <a href="https://wa.me/2348069387354" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-secondary transition-colors">+234 806 938 7354 (WhatsApp)</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">Social Media</p>
                    <a href="https://instagram.com/thewaterandwisdomfoundation" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-secondary transition-colors">@thewaterandwisdomfoundation</a>
                  </div>
                </div>
              </div>

              {/* Responsiveness Metrics */}
              <div className="mt-10 bg-muted rounded-2xl p-6">
                <h3 className="font-heading font-bold text-sm text-foreground mb-4 uppercase tracking-wider">Our Responsiveness</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Clock className="text-secondary mx-auto mb-2" size={20} />
                    <p className="font-heading font-extrabold text-lg text-foreground">&lt; 2h</p>
                    <p className="text-xs text-muted-foreground">Avg. Response</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="text-secondary mx-auto mb-2" size={20} />
                    <p className="font-heading font-extrabold text-lg text-foreground">96%</p>
                    <p className="text-xs text-muted-foreground">Weekly Resolution</p>
                  </div>
                  <div className="text-center">
                    <Star className="text-secondary mx-auto mb-2" size={20} />
                    <p className="font-heading font-extrabold text-lg text-foreground">4.8/5</p>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h3 className="font-heading font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Stay Updated</h3>
                <NewsletterForm variant="standalone" />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-secondary" size={20} />
                  <p className="text-sm text-muted-foreground">Your message will open in WhatsApp for instant support</p>
                </div>
                <div>
                  <label className="font-heading text-sm font-semibold text-foreground block mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-heading text-sm font-semibold text-foreground block mb-1.5">Organization</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-heading text-sm font-semibold text-foreground block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-heading text-sm font-semibold text-foreground block mb-1.5">Message Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>General</option>
                    <option>Partnership</option>
                    <option>Funding Inquiry</option>
                    <option>Volunteer</option>
                  </select>
                </div>
                <div>
                  <label className="font-heading text-sm font-semibold text-foreground block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-semibold">
                  <MessageCircle size={18} className="mr-2" /> Send via WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
