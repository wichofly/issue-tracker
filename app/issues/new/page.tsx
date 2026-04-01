'use client';

import { Button, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import type { Options } from 'easymde';
import { useMemo } from 'react';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const NewIssuePage = () => {
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as Options;
  }, []);

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" radius="large" />
      <SimpleMDE
        options={autofocusNoSpellcheckerOptions}
        placeholder="Description of the issue."
      />
      <Button size="2" variant="soft">
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
