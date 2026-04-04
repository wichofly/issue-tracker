import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button size="2" variant="soft">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
