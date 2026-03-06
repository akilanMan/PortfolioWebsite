import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/section-heading';

type AboutProps = {
  bio: string;
  school: string;
  degree: string;
  location: string;
  coursework: string[];
};

export function About({ bio, school, degree, location, coursework }: AboutProps) {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeading eyebrow="About" title="Who am I?" />
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{bio}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="rounded-2xl border border-line/70 bg-paper/80 p-6 shadow-soft">
            <h3 className="font-serif text-2xl">Education</h3>
            <div className="mt-4 space-y-1 text-sm text-muted">
              <p className="font-medium text-ink">{school}</p>
              <p>{degree}</p>
              <p>{location}</p>
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-muted">Coursework</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{coursework.join(' • ')}</p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
