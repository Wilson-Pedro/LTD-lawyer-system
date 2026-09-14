import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink as MantineNavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getNavItemsForRole } from './navigationConfig';
import { paths } from '@/routes/paths';

export function MainLayout() {
  // controla o navbar em telas pequenas (mobile) — abre/fecha como um drawer
  const [mobileAberto, { toggle: toggleMobile }] = useDisclosure();
  // controla o navbar em telas grandes (desktop) — expande/colapsa a largura
  const [desktopExpandido, { toggle: toggleDesktop }] = useDisclosure(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = getNavItemsForRole(user!.role);

  async function handleLogout() {
    await logout();
    navigate(paths.login, { replace: true });
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopExpandido ? 240 : 70,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileAberto, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            {/* burger visível só em mobile — abre/fecha o drawer */}
            <Burger
              opened={mobileAberto}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            {/* burger visível só em desktop — colapsa/expande a largura */}
            <Burger
              opened={desktopExpandido}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Text fw={600}>Núcleo Jurídico</Text>
          </Group>

          <Text size="sm" c="dimmed">
            {user?.login}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ flex: 1 }}>
          {navItems.map((item) => (
            <MantineNavLink
              key={item.to}
              component={NavLink}
              to={item.to}
              label={desktopExpandido ? item.label : undefined}
              leftSection={item.icon}
            />
          ))}
        </div>

        <MantineNavLink
          label={desktopExpandido ? 'Sair' : undefined}
          leftSection={<IconLogout size={18} />}
          onClick={handleLogout}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
