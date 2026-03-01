import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Droplets, GraduationCap, Compass, Gift, Landmark, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

const donationSchema = z.object({
  amount: z.number().min(100, "Minimum donation is 100").max(100_000_000, "Amount too large"),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  purpose: z.string().min(1),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});

const currencies = [
  { code: "NGN", symbol: "₦", label: "Naira" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "EUR", symbol: "€", label: "Euro" },
];

const presets: Record<string, number[]> = {
  NGN: [5000, 10000, 25000, 50000, 100000],
  USD: [10, 25, 50, 100, 250],
  GBP: [10, 20, 50, 100, 200],
  EUR: [10, 25, 50, 100, 250],
};

const purposes = [
  { key: "general", label: "General Fund", icon: Gift },
  { key: "water", label: "Clean Water", icon: Droplets },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "leadership", label: "Leadership", icon: Compass },
];

const bankAccounts = [
  { currency: "NGN", account: "0694517616", label: "Naira Account" },
  { currency: "USD", account: "0694517630", label: "USD Account" },
];

export function InlineDonationForm() {
  const [currency, setCurrency] = useState("NGN");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const cur = currencies.find((c) => c.code === currency)!;
  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(account);
    toast.success("Account number copied!");
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleDonate = () => {
    const result = donationSchema.safeParse({
      amount: finalAmount ?? 0,
      currency,
      purpose,
      name,
      email,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    toast.info("Payment processing will be available soon. Thank you for your generosity!");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 bg-muted"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-10">
          <Heart className="mx-auto text-secondary mb-3" size={32} />
          <h2 className="font-heading font-extrabold text-3xl text-foreground mb-3">
            Support Our Work
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your contribution directly funds clean water, education, and leadership programmes.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Main donation form */}
          <div className="md:col-span-3 bg-card border border-border rounded-2xl p-8">
            {/* Currency */}
            <label className="font-heading text-sm font-semibold text-foreground block mb-2">Currency</label>
            <div className="flex gap-2 mb-6">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setSelectedAmount(null); setCustomAmount(""); }}
                  className={`px-4 py-2 rounded-lg text-sm font-heading font-semibold transition-all ${
                    currency === c.code
                      ? "bg-secondary text-secondary-foreground shadow-teal"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>

            {/* Amount */}
            <label className="font-heading text-sm font-semibold text-foreground block mb-2">Amount</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
              {presets[currency].map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); setErrors((e) => ({ ...e, amount: "" })); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-heading font-bold transition-all ${
                    selectedAmount === amt && !customAmount
                      ? "bg-secondary text-secondary-foreground shadow-teal"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cur.symbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder={`Custom amount (${cur.code})`}
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); setErrors((er) => ({ ...er, amount: "" })); }}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-heading focus:outline-none focus:ring-2 focus:ring-ring mb-1"
            />
            {errors.amount && <p className="text-destructive text-xs mb-4">{errors.amount}</p>}

            {/* Purpose */}
            <label className="font-heading text-sm font-semibold text-foreground block mb-2 mt-5">Purpose</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {purposes.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPurpose(key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-heading transition-all text-left ${
                    purpose === key
                      ? "bg-secondary text-secondary-foreground shadow-teal"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: "" })); }}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: "" })); }}
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <Button
              onClick={handleDonate}
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-base"
            >
              Donate{finalAmount ? ` ${cur.symbol}${finalAmount.toLocaleString()}` : ""}
            </Button>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Secure & encrypted. You'll receive a tax-deductible receipt via email.
            </p>
          </div>

          {/* Bank Details Sidebar */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Landmark size={20} className="text-secondary" />
                <h3 className="font-heading font-bold text-lg text-foreground">Bank Transfer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                All donations payable to:
              </p>

              <div className="space-y-1 mb-5">
                <p className="font-heading font-bold text-foreground text-sm">Water and Wisdom Foundation</p>
                <p className="text-sm text-muted-foreground">Guaranty Trust Bank</p>
              </div>

              <div className="space-y-3">
                {bankAccounts.map((acc) => (
                  <div key={acc.currency} className="bg-muted rounded-xl p-4">
                    <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-1">{acc.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-heading font-extrabold text-lg text-foreground tracking-wide">{acc.account}</p>
                      <button
                        onClick={() => handleCopy(acc.account)}
                        className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
                        aria-label={`Copy ${acc.label}`}
                      >
                        {copiedAccount === acc.account ? <Check size={16} className="text-secondary" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact preview */}
            <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6">
              <h4 className="font-heading font-bold text-sm text-foreground mb-3">Your Impact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-secondary">•</span>₦5,000 provides notebooks for 10 students</li>
                <li className="flex items-start gap-2"><span className="text-secondary">•</span>₦25,000 funds a school hygiene campaign</li>
                <li className="flex items-start gap-2"><span className="text-secondary">•</span>₦100,000 contributes to a borehole project</li>
                <li className="flex items-start gap-2"><span className="text-secondary">•</span>$250 sponsors a full VALP school campaign</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
