// features/dashboard/components/DashboardCard.tsx
import { Card, Text, ThemeIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

export function DashboardCard({
  title,
  description,
  icon,
  to,
}: DashboardCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      onClick={() => navigate(to)}
      style={{ cursor: 'pointer' }}
    >
      <ThemeIcon size="lg" radius="md" mb="sm">
        {icon}
      </ThemeIcon>
      <Text fw={500} mb={4}>
        {title}
      </Text>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Card>
  );
}
