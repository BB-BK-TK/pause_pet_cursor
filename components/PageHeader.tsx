type PageHeaderProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  align?: "center" | "left";
  compact?: boolean;
};

export default function PageHeader({
  title,
  subtitle,
  tagline,
  align = "center",
  compact = false,
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <header className={`${alignClass} ${compact ? "mb-1" : "mb-2"}`}>
      {tagline && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700/90">
          {tagline}
        </p>
      )}
      {title && (
        <h1
          className={`font-bold text-stone-900 ${
            compact ? "text-xl" : "text-2xl tracking-tight"
          } ${tagline ? "mt-2" : ""}`}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{subtitle}</p>
      )}
    </header>
  );
}
