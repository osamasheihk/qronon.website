import type { ClaimStatus } from "@/data/site";

const styles: Record<ClaimStatus, string> = {
  "Internally demonstrated": "border-cyan/30 bg-cyan/10 text-cyan",
  "Under validation": "border-amber/40 bg-amber/10 text-amber",
  "Partner validation": "border-green/40 bg-green/10 text-green",
  Roadmap: "border-white/20 bg-white/10 text-slate-200"
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
