import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
        <Heading>{issue.title}</Heading>
        <Flex gap="4" my="2" align="center">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
