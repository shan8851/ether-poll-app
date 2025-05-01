'use client';

import { Dialog } from 'radix-ui';
import { CreateTopicForm } from './createTopicForm';
import { useAccount } from 'wagmi';

export const CreateTopicDialog: React.FC = () => {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-purple text-background px-4 py-2 font-bold rounded-md hover:bg-purple/75">
        Create new topic
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-border rounded-lg p-6"
        >
          <Dialog.Title>Create new topic</Dialog.Title>
          <CreateTopicForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
