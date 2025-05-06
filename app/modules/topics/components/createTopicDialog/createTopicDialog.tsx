'use client';

import { Dialog } from 'radix-ui';
import { CreateTopicForm } from './createTopicForm';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export const CreateTopicDialog: React.FC = () => {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);

  if (!address) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-purple text-background px-4 py-2 font-bold rounded hover:bg-purple/75">
        Create new topic
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl
             bg-surface border border-border rounded-xl p-6 shadow-xl
             animate-in fade-in zoom-in-90"
        >
          <Dialog.Title className="text-lg font-bold text-text mb-4">
            Create a new topic
          </Dialog.Title>
          <CreateTopicForm onClose={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
