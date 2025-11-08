import { Link } from '@/components/server';
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
    <nav aria-label="Social links">
      <ul className="flex list-none flex-wrap gap-4">
        {links.map(link => (
          <li
            key={link.label}
            className="flex items-center gap-2"
          >
            <span aria-hidden="true">{link.icon}</span>
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
