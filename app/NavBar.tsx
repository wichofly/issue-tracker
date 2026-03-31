import Link from 'next/link';
import { GiSpottedBug } from 'react-icons/gi';

const NavBar = () => {
  return (
    <nav className="flex space-x-6 border-b border-b-zinc-300 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GiSpottedBug className="text-2xl" />
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/issues"
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
