import { Grid, Text } from '@mantine/core';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  span?: number;
}

export function DetailField({ label, value, span = 6 }: DetailFieldProps) {
  return (
    <Grid.Col span={span}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text>{value ?? '-'}</Text>
    </Grid.Col>
  );
}
