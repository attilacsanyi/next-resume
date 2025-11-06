import type { Socials } from '../../resume.types';

type SocialLinksProps = {
  socials: Socials;
};

export const SocialLinks = ({ socials }: SocialLinksProps) => {
  const links = [
    { label: 'Email', url: `mailto:${socials.email}`, icon: '📧' },
    { label: 'LinkedIn', url: socials.linkedin, icon: '💼' },
    { label: 'GitHub', url: socials.github, icon: '💻' },
    { label: 'Twitter (X)', url: socials.twitter, icon: '🐦' },
  ];

  return (
    <nav
      aria-label="Social links"
      className="flex flex-wrap gap-4"
    >
      {links.map(link => (
        <a
          key={link.label}
          className="text-foreground/80 hover:text-foreground flex items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline print:no-underline"
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span aria-hidden="true">{link.icon}</span>
          <span>{link.label}</span>
        </a>
      ))}
    </nav>
  );
};
