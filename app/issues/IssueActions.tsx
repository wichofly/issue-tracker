import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <div className="flex justify-between mb-5">
      <IssueStatusFilter />
      <Button size="2" variant="soft">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
