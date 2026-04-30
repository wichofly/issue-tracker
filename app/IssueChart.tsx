'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type IssueChartProps = {
  issueCounts: {
    open: number;
    inProgress: number;
    closed: number;
  };
};

const IssueChart = ({ issueCounts }: IssueChartProps) => {
  const data = [
    { label: 'Open', value: issueCounts.open },
    { label: 'In Progress', value: issueCounts.inProgress },
    { label: 'Closed', value: issueCounts.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
