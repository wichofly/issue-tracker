'use client';

import { Badge, Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import type { Options } from 'easymde';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NewIssuePageProps {
  title: string;
  description: string;
}

// Dynamically import the SimpleMDE component to prevent SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as Options;
  }, []);
  const [error, setError] = useState<string | null>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewIssuePageProps>();

  const onSubmit: SubmitHandler<NewIssuePageProps> = async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError(
        'An unexpected error occurred while creating the issue. Please try again.',
      );
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {errors.title && <Badge color="crimson">Title is required</Badge>}
        <TextField.Root
          placeholder="Title"
          radius="large"
          {...register('title', { required: true })}
        />

        {errors.description && (
          <Badge color="crimson">Description is required</Badge>
        )}
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              options={autofocusNoSpellcheckerOptions}
              placeholder="Description of the issue."
            />
          )}
        />

        <Button size="2" variant="soft" type="submit">
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
