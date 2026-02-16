import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

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
    // placeholder
    alert("Thank you for reaching out! We'll respond shortly.");
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
                    <p className="font-heading font-semibold text-sm text-foreground">Phone</p>
                    <a href="https://wa.me/2348069387354" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-secondary transition-colors">+234 806 938 7354 (WhatsApp)</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">Social Media</p>
                    <a href="https://instagram.com/thewaterandwisdomfoundation" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-secondary transition-colors">@thewaterandwisdomfoundation</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
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
                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold">
                  Send Message
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
