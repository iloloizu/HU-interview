export function DashboardWidget({ title, value, accent = 'primary' }: { title: string; value: string; accent?: 'primary' | 'accent' }) {
  const border = accent === 'accent' ? 'border-pms-186 data-[theme=dark]:border-pms-123' : 'border-pms-2965';
  return (
    <div className={`border ${border} rounded-md p-4 bg-white shadow-sm data-[theme=dark]:bg-black/20`}>
      <div className="text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">{title}</div>
      <div className="text-2xl font-bold mt-1 text-pms-2965 data-[theme=dark]:text-pms-123">{value}</div>
    </div>
  );
}
