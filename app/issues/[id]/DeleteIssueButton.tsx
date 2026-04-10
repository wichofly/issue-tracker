'use client';

import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const deleteIssueMutation = useMutation({
    mutationFn: async () => axios.delete(`/api/issues/${issueId}`),
    onSuccess: () => {
      router.push('/issues');
      router.refresh();
    },
  });

  const handleDelete = () => {
    deleteIssueMutation.mutate();
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            disabled={deleteIssueMutation.isPending}
            style={{
              cursor: deleteIssueMutation.isPending ? 'not-allowed' : 'pointer',
            }}
          >
            Delete Issue
            {deleteIssueMutation.isPending && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" style={{ cursor: 'pointer' }}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={handleDelete}
                disabled={deleteIssueMutation.isPending}
                style={{ cursor: 'pointer' }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root
        open={deleteIssueMutation.isError}
        onOpenChange={(open) => {
          if (!open) deleteIssueMutation.reset();
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted due to an error. Please try again
            later.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => deleteIssueMutation.reset()}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
