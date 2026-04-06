'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import type { Options } from 'easymde';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/app/components';
import { CreateIssueForm, createIssueSchema } from '@/app/validationSchema';

// Dynamically import the SimpleMDE component to prevent SSR issues, not render on the server side, and ensure it only loads in the browser environment. 
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

  // await delay(2000); // Simulate loading delay

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
