import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewsletterFormProps {
  variant?: "footer" | "standalone";
}

export function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [donationUpdates, setDonationUpdates] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gdprConsent) {
      toast.error("Please consent to data processing to subscribe.");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: trimmedEmail,
        gdpr_consent: gdprConsent,
        consent_timestamp: new Date().toISOString(),
        donation_updates: donationUpdates,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome! You've been subscribed successfully.");
        setEmail("");
        setGdprConsent(false);
        setDonationUpdates(false);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={isFooter ? "flex gap-2" : "flex gap-2"}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={
            isFooter
              ? "flex-1 px-3 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-secondary"
              : "flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          }
        />
        <button
          type="submit"
          disabled={loading}
          className={
            isFooter
              ? "px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-heading text-sm font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
              : "px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-heading text-sm font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
          }
        >
          {loading ? "…" : "Join"}
        </button>
      </div>

      <label className={`flex items-start gap-2 cursor-pointer ${isFooter ? "text-primary-foreground" : "text-foreground"}`}>
        <input
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-0.5 rounded border-primary-foreground/30 accent-secondary"
        />
        <span className={`text-xs leading-relaxed ${isFooter ? "opacity-60" : "text-muted-foreground"}`}>
          I consent to receiving emails and agree to the processing of my data in accordance with GDPR. You can unsubscribe at any time.
        </span>
      </label>

      <label className={`flex items-start gap-2 cursor-pointer ${isFooter ? "text-primary-foreground" : "text-foreground"}`}>
        <input
          type="checkbox"
          checked={donationUpdates}
          onChange={(e) => setDonationUpdates(e.target.checked)}
          className="mt-0.5 rounded border-primary-foreground/30 accent-secondary"
        />
        <span className={`text-xs leading-relaxed ${isFooter ? "opacity-60" : "text-muted-foreground"}`}>
          Also send me donation impact updates and reports.
        </span>
      </label>
    </form>
  );
}
