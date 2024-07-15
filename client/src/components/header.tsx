import { Link } from '@tanstack/react-router';

const NAV_LINKS = [
  ['Projects', '/'],
  ['Personal', '/personal'],
  ['Blogs', '/blogs'],
];

export function Header() {
  return (
    <header className="py-4">
      <nav className="space-x-5 text-center font-mono lowercase">
        {NAV_LINKS.map(([label, href]) => (
          <Link
            key={href}
            to={href}
            className="[&.active]:underline underline-offset-2"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
