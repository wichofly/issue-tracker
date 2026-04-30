import prisma from '@/prisma/client';
import { Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

export const Home = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });

  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });

  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const issueCounts = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Grid gap="5">
        <IssueSummary issueCounts={issueCounts} />
        <IssueChart issueCounts={issueCounts} />
      </Grid>

      <LatestIssues />
    </Grid>
  );
};

export const metadata: Metadata = {
  title: 'Issue Tracker Dashboard',
  description: 'A dashboard to track and manage issues effectively.',
};

export const dynamic = 'force-dynamic';

export default Home;
