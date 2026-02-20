interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  eyebrowColor?: string;
}

export default function SectionTitle({ eyebrow, title, subtitle, eyebrowColor = "text-purple-400" }: Props) {
  return (
    <div className="mb-14 text-center">
      <span className={`text-xs font-bold uppercase tracking-widest ${eyebrowColor} px-3 py-1 rounded-full border border-current/30 bg-current/5`}>
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl md:text-5xl font-black text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
