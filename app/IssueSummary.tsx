import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type IssueSummaryProps = {
  issueCounts: {
    open: number;
    inProgress: number;
    closed: number;
  };
};

const IssueSummary = ({ issueCounts }: IssueSummaryProps) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open', value: issueCounts.open, status: 'OPEN' },
    {
      label: 'In Progress',
      value: issueCounts.inProgress,
      status: 'IN_PROGRESS',
    },
    { label: 'Closed', value: issueCounts.closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4">
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
