import authOptions from '@/app/api/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import StatusSelect from './StatusSelect';

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  }),
);

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const issue = await fetchUser(parseInt(id));

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
            <StatusSelect issue={issue} />
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({
  params,
}: IssueDetailPageProps): Promise<Metadata> => {
  const { id } = await params;

  const issue = await fetchUser(parseInt(id));

  if (!issue) {
    return {
      title: 'Issue Not Found',
      description: 'The requested issue does not exist.',
    };
  }

  return {
    title: `Issue #${issue.id} - ${issue.title}`,
    description: `Details and management options for issue #${issue.id}.`,
  };
};

export default IssueDetailPage;
