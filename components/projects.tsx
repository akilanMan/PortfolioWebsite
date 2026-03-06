'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/section-heading';
import type { ProjectItem } from '@/data/siteData';

type ProjectsProps = {
  projects: ProjectItem[];
};

export function Projects({ projects }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeading eyebrow="Projects" title="Selected work" description="A compact set of projects focused on autonomy, NLP workflows, and data-driven product design." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="group rounded-2xl border border-line/70 bg-paper/75 p-6 shadow-sm transition-[border-color,background] duration-300 ease-luxe hover:border-line hover:bg-gradient-to-b hover:from-paper hover:to-ink/5"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl">{project.name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{project.role} · {project.period}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <button className="focus-ring underline-offset-4 hover:underline" onClick={() => setActiveProject(project)}>
                More details
              </button>
              {project.github && (
                <Link href={project.github} target="_blank" rel="noreferrer" className="focus-ring text-muted underline-offset-4 hover:text-ink hover:underline">
                  GitHub
                </Link>
              )}
              {project.live && (
                <Link href={project.live} target="_blank" rel="noreferrer" className="focus-ring text-muted underline-offset-4 hover:text-ink hover:underline">
                  Live
                </Link>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/50 px-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            aria-hidden={!activeProject}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-2xl border border-line/50 bg-paper p-6 shadow-soft"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 id="project-modal-title" className="font-serif text-3xl">
                    {activeProject.name}
                  </h4>
                  <p className="mt-1 text-sm text-muted">{activeProject.role} · {activeProject.period}</p>
                </div>
                <button className="focus-ring rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.15em]" onClick={() => setActiveProject(null)}>
                  Close
                </button>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                {activeProject.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden>·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
