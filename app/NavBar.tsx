'use client';

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Spinner,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { GiSpottedBug } from 'react-icons/gi';
// import { Spinner } from '@/app/components';

const NavBar = () => {
  return (
    <nav className="border-b border-b-zinc-300 mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="3">
            <Link href="/">
              <GiSpottedBug className="text-2xl" />
            </Link>
            <NavLinks />
          </Flex>
          <Suspense fallback={<Spinner />}>
            <AuthStatus />
          </Suspense>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link': true,
              'text-zinc-900!': link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Spinner />;

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex align="center" gap="2" className="cursor-pointer">
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              referrerPolicy="no-referrer"
            />
            {/* <span>{session.user!.name}</span> */}
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
