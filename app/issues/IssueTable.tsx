import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Link, Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { IssueStatusBadge } from '../components';

export type IssueQuery = {
  searchParams: {
    status?: string;
    orderBy?: string;
    page?: string;
  };
};

type IssueTableProps = {
  searchParams: IssueQuery['searchParams'];
  issues: Issue[];
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

const IssueTable = ({ searchParams, issues }: IssueTableProps) => {
  const validStatus = Object.values(Status).find(
    (value) => value === searchParams.status
  );
  const validOrderBy: keyof Issue =
    columnNames.find((columnName) => columnName === searchParams.orderBy) ??
    'createdAt';

  return (
    <Table.Root variant="surface" mb="4">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: validStatus
                    ? { status: validStatus, orderBy: column.value }
                    : { orderBy: column.value },
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
  );
};

export default IssueTable;
