'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';
import Link from 'next/link';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" radius="large" />
      <TextArea placeholder="Description" radius="large" />

      <Button size="2" variant="soft">
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
