import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import ReactMarkDown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
