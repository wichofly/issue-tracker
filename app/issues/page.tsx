import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import delay from 'delay';
import { Metadata } from 'next';
import Pagination from '../components/Pagination';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

type IssuePageProps = {
  searchParams: Promise<IssueQuery>;
};

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  const parsedSearchParams = await searchParams;
  const { status, orderBy, page: pageParam } = parsedSearchParams;

  const validStatus = Object.values(Status).find((value) => value === status);
  const validOrderBy: keyof Issue =
    columnNames.find((columnName) => columnName === orderBy) ?? 'createdAt';
  const page = Math.max(1, parseInt(pageParam || '1', 10));
  const pageSize = 10;

  const where = { status: validStatus };

  const issueCount = await prisma.issue.count({
    where,
  });

  const pageCount = Math.max(1, Math.ceil(issueCount / pageSize));
  const currentPage = Math.min(page, pageCount);

  // Fetch issues from the database based on the validated status and orderBy parameters
  const issues = await prisma.issue.findMany({
    where,
    orderBy: {
      [validOrderBy]: 'desc',
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  await delay(2000); // Simulate loading delay

  return (
    <div>
      <IssueActions />

      <IssueTable searchParams={parsedSearchParams} issues={issues} />

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered on the server

export const metadata: Metadata = {
  title: 'Issue Tracker List',
  description:
    'View and manage issues with ease using our comprehensive issue tracker dashboard.',
};

export default IssuePage;
