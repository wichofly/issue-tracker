'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiSpottedBug } from 'react-icons/gi';

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="flex space-x-6 border-b border-b-zinc-300 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GiSpottedBug className="text-2xl" />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${currentPath === link.href ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
