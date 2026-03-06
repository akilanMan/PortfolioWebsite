import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { Projects } from '@/components/projects';
import { ScrollIndicator } from '@/components/scroll-indicator';
import { Skills } from '@/components/skills';
import { siteData } from '@/data/siteData';

export default function Home() {
  const { identity, nav, about, experience, projects, skills } = siteData;

  return (
    <div className="min-h-screen text-ink">
      <a href="#main-content" className="focus-ring sr-only rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
        Skip to content
      </a>

      <Navbar name={identity.name} navItems={nav} />
      <ScrollIndicator />

      <div className="page-enter">
        <main id="main-content">
          <Hero
            name={identity.name}
            title={identity.title}
            subtitle={identity.subtitle}
            headshot={identity.headshot}
            location={identity.location}
            linkedin={identity.linkedin}
            github={identity.github}
          />
          <About
            bio={about.bio}
            school={about.education.school}
            degree={about.education.degree}
            location={about.education.location}
            coursework={about.education.coursework}
          />
          <Experience items={experience} />
          <Projects projects={projects} />
          <Skills skills={skills} />
        </main>

        <Footer email={identity.email} linkedin={identity.linkedin} github={identity.github} />
      </div>
    </div>
  );
}
