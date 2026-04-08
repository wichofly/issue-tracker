import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  // await delay(2000); // Simulate loading delay

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <div className="flex flex-col gap-4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
