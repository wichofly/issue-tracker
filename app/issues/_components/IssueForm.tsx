'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import type { Options } from 'easymde';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/app/components';
import {  IssueData, issueSchema } from '@/app/validationSchema';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

interface IssueFormProps {
  issue?: Issue;
}

const IssueForm = ({ issue }: IssueFormProps) => {
  const router = useRouter();
  const isEditing = Boolean(issue);
  const issueId = issue?.id;
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
  } = useForm<IssueData>({
    resolver: zodResolver(issueSchema), // Integrate Zod validation with react-hook-form using the zodResolver
  });

  const onSubmit: SubmitHandler<IssueData> = async (data) => {
    try {
      setIsLoading(true);
      if (isEditing && issueId)
        await axios.patch(`/api/issues/${issueId}`, data);
      else await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : null;

      setError(
        errorMessage ||
          (isEditing
            ? 'An unexpected error occurred while updating the issue. Please try again.'
            : 'An unexpected error occurred while creating the issue. Please try again.'),
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
          defaultValue={issue?.title}
          placeholder="Title"
          radius="large"
          {...register('title', { required: true })}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
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
          {isEditing ? 'Update Issue' : 'Submit New Issue'}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
