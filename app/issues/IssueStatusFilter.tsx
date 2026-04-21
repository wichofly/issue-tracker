'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');
  const currentStatus = Object.values(Status).find(
    (value) => value === statusParam,
  );

  return (
    <Select.Root
      defaultValue={currentStatus ?? 'ALL'}
      onValueChange={(nextStatus) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextStatus === 'ALL') params.delete('status');
        else params.set('status', nextStatus);
        params.delete('page');

        const query = params.size ? `?${params.toString()}` : '';
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((statusOption) => (
          <Select.Item key={statusOption.value} value={statusOption.value}>
            {statusOption.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
