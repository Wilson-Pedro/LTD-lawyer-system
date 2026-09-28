import { Group, Title, Badge, Stack, BadgeProps } from '@mantine/core';

interface DetailHeaderProps {
  title: string;
  badges?: (BadgeProps & { label: string })[];
  actions?: React.ReactNode;
}

export function DetailHeader({ title, badges, actions }: DetailHeaderProps) {
  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={4}>
        <Title order={3}>{title}</Title>
        {badges && badges.length > 0 && (
          <Group gap={'xs'}>
            {badges.map((badge, index) => {
              const { label, ...props } = badge;

              return (
                <Badge key={index} {...props}>
                  {label}
                </Badge>
              );
            })}
          </Group>
        )}
      </Stack>
      <Group>{actions}</Group>
    </Group>
  );
}
