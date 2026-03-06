import Link from 'next/link';

type FooterProps = {
  email: string;
  linkedin: string;
  github: string;
};

export function Footer({ email, linkedin, github }: FooterProps) {
  return (
    <footer id="contact" className="border-t border-line/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 lg:px-8">
        <h2 className="font-serif text-3xl">connect with me! i am constantly looking to expand my circle</h2>
        <Link href={`mailto:${email}`} className="focus-ring w-fit text-base text-muted underline-offset-4 hover:text-ink hover:underline">
          {email}
        </Link>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
          <Link href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer" className="focus-ring hover:text-ink">
            LinkedIn
          </Link>
          <Link href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="focus-ring hover:text-ink">
            GitHub
          </Link>
          <Link href="#home" className="focus-ring ml-auto rounded-full border border-line px-3 py-1.5 text-xs uppercase tracking-[0.15em] hover:border-ink">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
