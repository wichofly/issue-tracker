import { IssueStatusBadge, Link } from '@/app/components';
import { Status } from '@prisma/client';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import delay from 'delay';
import IssueActions from './IssueActions';

type IssuePageProps = {
  searchParams: Promise<{ status?: Status }>;
};

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  const statuses = Object.values(Status);
  const { status } = await searchParams;
  const validStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
  });
  await delay(2000); // Simulate loading delay

  return (
    <div>
      <IssueActions status={validStatus ?? 'ALL'} />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered on the server

export default IssuePage;
