'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import type { Options } from 'easymde';
import axios from 'axios';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';

import { createIssueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';

type CreateIssueForm = z.infer<typeof createIssueSchema>;

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    resolver: zodResolver(createIssueSchema), // Integrate Zod validation with react-hook-form using the zodResolver
  });

  const onSubmit: SubmitHandler<CreateIssueForm> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setIsLoading(false);
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Title"
          radius="large"
          {...register('title', { required: true })}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
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

        <Button size="2" variant="soft" type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2" />}
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
