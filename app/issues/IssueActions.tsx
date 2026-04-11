import { Button } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

type Props = {
  status?: Status;
};

const IssueActions = ({ status }: Props) => {
  return (
    <div className="flex justify-between mb-5">
      <IssueStatusFilter status={status} />
      <Button size="2" variant="soft">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
