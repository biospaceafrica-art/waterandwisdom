import { motion } from "framer-motion";

interface RegionData {
  name: string;
  donations: number;
  projects: number;
  beneficiaries: number;
  intensity: number; // 0-1
}

const regions: RegionData[] = [
  { name: "Cross River", donations: 2450000, projects: 12, beneficiaries: 3200, intensity: 1.0 },
  { name: "Akwa Ibom", donations: 1800000, projects: 9, beneficiaries: 2400, intensity: 0.73 },
  { name: "Abia", donations: 1350000, projects: 7, beneficiaries: 1800, intensity: 0.55 },
  { name: "Enugu", donations: 1100000, projects: 6, beneficiaries: 1500, intensity: 0.45 },
  { name: "Ebonyi", donations: 850000, projects: 5, beneficiaries: 1100, intensity: 0.35 },
];

function getHeatColor(intensity: number) {
  // From muted teal to full teal
  const lightness = 80 - intensity * 44;
  return `hsl(167, 70%, ${lightness}%)`;
}

export function RegionHeatmap() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-heading font-bold text-lg text-foreground mb-2">Regional Impact Heatmap</h3>
      <p className="text-sm text-muted-foreground mb-6">Donation distribution across focus states</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {regions.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-4 text-center transition-all hover:shadow-teal cursor-default"
            style={{ backgroundColor: getHeatColor(r.intensity) }}
          >
            <p className="font-heading font-bold text-sm text-foreground">{r.name}</p>
            <p className="font-heading font-extrabold text-lg text-foreground mt-1">
              ₦{(r.donations / 1000000).toFixed(1)}M
            </p>
            <p className="text-[11px] text-foreground/70 mt-1">{r.projects} projects</p>
            <p className="text-[11px] text-foreground/70">{r.beneficiaries.toLocaleString()} lives</p>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Lower Impact</span>
        <div className="flex gap-0.5">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
            <div
              key={v}
              className="w-6 h-3 rounded-sm"
              style={{ backgroundColor: getHeatColor(v) }}
            />
          ))}
        </div>
        <span>Higher Impact</span>
      </div>
    </div>
  );
}
