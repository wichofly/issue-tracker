import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  // await delay(2000); // Simulate loading delay

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5" width="auto">
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
