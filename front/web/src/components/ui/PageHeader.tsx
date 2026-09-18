import { Box, BoxProps, Title } from '@mantine/core';

interface PageHeaderProps extends BoxProps {
  title: string;
}

export function PageHeader({ title, ...rest }: PageHeaderProps) {
  return (
    <Box mb="xl" {...rest}>
      <Title order={2} size="h3" c="institucional.8" fw={700}>
        {title}
      </Title>
    </Box>
  );
}
