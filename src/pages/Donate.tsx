import { Layout } from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Heart, Repeat, Droplets, GraduationCap, Compass, Gift } from "lucide-react";
import { toast } from "sonner";

const amounts = [5000, 10000, 25000, 50000, 100000];

const Donate = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleDonate = () => {
    if (!finalAmount || finalAmount < 100) {
      toast.error("Please select or enter a valid amount.");
      return;
    }
    toast.info("Payment processing will be available soon. Thank you for your interest in supporting our work!");
  };

  const impactItems = [
    { amount: "₦5,000", impact: "Provides clean water for one child for a year", icon: Droplets },
    { amount: "₦25,000", impact: "Sponsors a student's education materials for a term", icon: GraduationCap },
    { amount: "₦100,000", impact: "Funds a complete VALP leadership session", icon: Compass },
  ];

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
              {t("donate_title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("donate_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3"
            >
              <div className="bg-card border border-border rounded-2xl p-8">
                {/* Mode Toggle */}
                <div className="flex gap-1 bg-muted rounded-lg p-1 mb-8">
                  <button
                    onClick={() => setMode("one-time")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-heading font-semibold transition-colors ${
                      mode === "one-time"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Heart size={16} /> {t("donate_one_time")}
                  </button>
                  <button
                    onClick={() => setMode("monthly")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-heading font-semibold transition-colors ${
                      mode === "monthly"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Repeat size={16} /> {t("donate_monthly")}
                  </button>
                </div>

                {mode === "monthly" && (
                  <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 mb-6">
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Repeat className="text-secondary shrink-0" size={16} />
                      {t("donate_monthly_note")}
                    </p>
                  </div>
                )}

                {/* Amount Selection */}
                <label className="font-heading text-sm font-semibold text-foreground block mb-3">
                  {t("donate_amount")} (NGN)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`px-4 py-3 rounded-xl text-sm font-heading font-bold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "bg-secondary text-secondary-foreground shadow-teal"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder={t("donate_custom")}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-heading focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Purpose */}
                <label className="font-heading text-sm font-semibold text-foreground block mb-3 mt-6">
                  {t("donate_purpose")}
                </label>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { key: "general", label: t("donate_purpose_general"), icon: Gift },
                    { key: "water", label: t("donate_purpose_water"), icon: Droplets },
                    { key: "education", label: t("donate_purpose_education"), icon: GraduationCap },
                    { key: "leadership", label: t("donate_purpose_leadership"), icon: Compass },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setPurpose(key)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-heading transition-all text-left ${
                        purpose === key
                          ? "bg-secondary text-secondary-foreground shadow-teal"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      <Icon size={16} /> {label}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleDonate}
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-base"
                >
                  {t("donate_proceed")} {finalAmount ? `— ₦${finalAmount.toLocaleString()}` : ""}
                  {mode === "monthly" ? "/mo" : ""}
                </Button>
              </div>
            </motion.div>

            {/* Impact Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h3 className="font-heading font-bold text-lg text-foreground mb-6">
                  {t("donate_impact_title")}
                </h3>
                <div className="space-y-5">
                  {impactItems.map(({ amount, impact, icon: Icon }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="text-secondary" size={18} />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-sm text-foreground">{amount}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{impact}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All donations are tax-deductible. You'll receive a receipt via email for your records. 
                    For donations above ₦500,000, please{" "}
                    <a href="/contact" className="text-secondary hover:underline">contact us directly</a>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
