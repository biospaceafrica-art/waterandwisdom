import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, FileText, Target, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: TrendingUp,
    title: "Dashboard Overview",
    desc: "See your total donations, receipt count, and SDG alignment at a glance.",
  },
  {
    icon: FileText,
    title: "Receipts & Records",
    desc: "Access and download tax-deductible receipts for every donation you've made.",
  },
  {
    icon: Target,
    title: "SDG Impact Tracking",
    desc: "View how your contributions align with UN Sustainable Development Goals.",
  },
  {
    icon: MapPin,
    title: "Region Heatmap",
    desc: "Visualize where your impact reaches across Nigeria's southeastern states.",
  },
  {
    icon: Download,
    title: "Export Reports",
    desc: "Download SDG alignment data as CSV for your records or annual reports.",
  },
];

export function PortalTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("portal_tour_seen");
    if (!seen) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("portal_tour_seen", "true");
  };

  if (!show) return null;

  const current = steps[step];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border rounded-2xl max-w-md w-full p-8 relative"
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            aria-label="Close tour"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
              <Icon className="text-secondary" size={28} />
            </div>
            <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-2">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">{current.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{current.desc}</p>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-6 bg-secondary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3 w-full">
              {step > 0 && (
                <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={dismiss}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
