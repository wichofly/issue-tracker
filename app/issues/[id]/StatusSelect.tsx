'use client';

import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const statusLabels: Record<Status, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed',
};

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const updateStatus = async (status: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
      <Select.Trigger placeholder="Change status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {Object.values(Status).map((status) => (
            <Select.Item key={status} value={status}>
              {statusLabels[status]}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
