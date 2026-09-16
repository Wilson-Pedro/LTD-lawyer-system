import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink as MantineNavLink,
  Avatar,
  Menu,
  UnstyledButton,
  Divider,
  Badge,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconChevronDown, IconScale } from '@tabler/icons-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getNavItemsForRole } from './navigationConfig';
import { paths } from '@/routes/paths';
import classes from './MainLayout.module.css';
import { modals } from '@mantine/modals';

export function MainLayout() {
  const [mobileAberto, { toggle: toggleMobile }] = useDisclosure();
  const [desktopExpandido, { toggle: toggleDesktop }] = useDisclosure(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = getNavItemsForRole(user!.role);

  function handleLogout() {
    modals.openConfirmModal({
      title: 'Sair do sistema',
      children: (
        <Text size="sm">
          Tem certeza que deseja sair? Você precisará fazer login novamente para
          continuar.
        </Text>
      ),
      labels: { confirm: 'Sair', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await logout();
        navigate(paths.login, { replace: true });
      },
    });
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: desktopExpandido ? 250 : 72,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileAberto, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileAberto}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopExpandido}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />

            <Group gap={8}>
              <IconScale
                size={22}
                color="var(--mantine-color-institucional-7)"
              />
              <Text
                fw={700}
                size="lg"
                c="institucional.8"
                className={classes.logo}
              >
                Núcleo Jurídico
              </Text>
            </Group>
          </Group>

          {/* menu do usuário na header */}
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap={8}>
                  <Avatar color="institucional" radius="xl" size={34}>
                    {user?.login.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="sm" fw={500}>
                      {user?.login}
                    </Text>
                    <Badge size="xs" variant="light" color="institucional">
                      {user?.role}
                    </Badge>
                  </div>
                  <IconChevronDown size={14} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={16} />}
                onClick={handleLogout}
              >
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        bg="institucional.8"
        style={{ display: 'flex', flexDirection: 'column', border: 'none' }}
      >
        <div style={{ flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <MantineNavLink
                key={item.to}
                component={NavLink}
                to={item.to}
                label={desktopExpandido ? item.label : undefined}
                leftSection={item.icon}
                active={isActive}
                className={classes.navLink}
                classNames={{
                  root: isActive ? classes.navLinkActive : undefined,
                }}
                mb={4}
              />
            );
          })}
        </div>

        <Divider color="institucional.6" mb="sm" />

        <MantineNavLink
          label={desktopExpandido ? 'Sair' : undefined}
          leftSection={<IconLogout size={20} />}
          onClick={handleLogout}
          className={classes.navLink}
        />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
