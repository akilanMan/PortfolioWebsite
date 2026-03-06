type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 space-y-3">
      {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>}
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
    </div>
  );
}
