export function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full h-3 bg-pms-2165/30 rounded-full overflow-hidden data-[theme=dark]:bg-pms-425/40">
      <div
        className="h-full bg-pms-2965 data-[theme=dark]:bg-pms-186 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
