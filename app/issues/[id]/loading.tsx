import { Box, Card, Flex, Heading, Skeleton, Text } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton height="1rem" />
      </Heading>
      <Flex gap="4" my="2" align="center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            iusto tempora maiores distinctio, iste impedit quo accusantium ex,
            officia est quia perspiciatis eos dolores. Nihil unde deleniti dolor
            minima perspiciatis.
          </Text>
        </Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
