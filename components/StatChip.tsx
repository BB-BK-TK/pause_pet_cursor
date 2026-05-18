type StatChipProps = {
  label: string;
  value: string;
};

export default function StatChip({ label, value }: StatChipProps) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-2xl border border-amber-100/80 bg-white/70 px-2 py-3.5 shadow-sm">
      <span className="text-lg font-bold tracking-tight text-stone-900">
        {value}
      </span>
      <span className="mt-1 text-center text-[11px] font-medium leading-tight text-stone-500">
        {label}
      </span>
    </div>
  );
}
