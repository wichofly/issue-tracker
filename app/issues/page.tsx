import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import delay from 'delay';
import NextLink from 'next/link';
import IssueActions from './IssueActions';

type IssuePageProps = {
  searchParams: Promise<{ status?: Status; orderBy: keyof Issue }>;
};

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const statuses = Object.values(Status);
  const { status, orderBy } = await searchParams;

  // Validate status parameter against allowed values, default to undefined (show all) if invalid
  const validStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  // Validate orderBy parameter against allowed columns, default to 'createdAt' if invalid
  const validOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? orderBy
    : 'createdAt';

  // Fetch issues from the database based on the validated status and orderBy parameters
  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
    orderBy: {
      [validOrderBy]: 'desc',
    },
  });

  await delay(2000); // Simulate loading delay

  return (
    <div>
      <IssueActions status={validStatus} />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { status: validStatus, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === validOrderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
