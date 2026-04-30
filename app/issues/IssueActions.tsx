import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { Suspense } from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <div className="flex justify-between mb-5">
      <Suspense>
        <IssueStatusFilter />
      </Suspense>
      <Button size="2" variant="soft">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
