import { SectionHeading } from '@/components/section-heading';

type SkillsProps = {
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
};

function ChipGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-line/70 bg-paper/80 px-3 py-1.5 text-xs tracking-wide text-ink">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeading eyebrow="Skills" title="Core stack" />
      <div className="space-y-8 rounded-2xl border border-line/70 bg-paper/70 p-6">
        <ChipGroup title="Languages" items={skills.languages} />
        <ChipGroup title="Frameworks" items={skills.frameworks} />
        <ChipGroup title="Tools / Tech" items={skills.tools} />
      </div>
    </section>
  );
}
