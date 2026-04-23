import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type IssueSummaryProps = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open', value: open, status: 'OPEN' },
    { label: 'In Progress', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4" mt="5">
      {containers.map((container) => (
        <Card key={container.value}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-semibold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
