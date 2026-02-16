import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SdgReport {
  sdg_number: number;
  title: string;
  description: string | null;
  progress_pct: number;
  target_value: number | null;
  current_value: number | null;
  unit: string | null;
  period: string | null;
}

function generateCSV(reports: SdgReport[]) {
  const header = "SDG Number,Title,Period,Progress %,Current Value,Target Value,Unit,Description";
  const rows = reports.map((r) =>
    [
      r.sdg_number,
      `"${r.title}"`,
      r.period || "",
      r.progress_pct,
      r.current_value ?? "",
      r.target_value ?? "",
      r.unit || "",
      `"${(r.description || "").replace(/"/g, '""')}"`,
    ].join(",")
  );
  return [header, ...rows].join("\n");
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function SdgExportButton({ reports }: { reports: SdgReport[] }) {
  const handleExport = () => {
    const csv = generateCSV(reports);
    const date = new Date().toISOString().slice(0, 10);
    downloadFile(csv, `sdg-impact-report-${date}.csv`, "text/csv;charset=utf-8;");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
      <Download size={16} />
      Export Report
    </Button>
  );
}
