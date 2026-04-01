'use client';

import { Badge, Button, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import type { Options } from 'easymde';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NewIssuePageProps {
  title: string;
  description: string;
}

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewIssuePageProps>();

  const onSubmit: SubmitHandler<NewIssuePageProps> = async (data) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      {errors.title && <Badge color="crimson">This field is required</Badge>}
      <TextField.Root
        placeholder="Title"
        radius="large"
        {...register('title', { required: true })}
      />

      {errors.description && (
        <Badge color="crimson">This field is required</Badge>
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
  );
};

export default NewIssuePage;
