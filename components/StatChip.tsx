type StatChipProps = {
  label: string;
  value: string;
};

export default function StatChip({ label, value }: StatChipProps) {
  return (
    <div className="stat-chip">
      <span className="stat-chip-value">{value}</span>
      <span className="stat-chip-label">{label}</span>
    </div>
  );
}
