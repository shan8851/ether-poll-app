import { Dialog } from "radix-ui";
import { WalletOptions } from "./walletOptions";

export const ConnectDialog: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-purple text-background px-4 py-2 font-bold rounded hover:bg-purple/75">
        Connect
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-border rounded p-6"
        >
          <Dialog.Title>Connect to Application</Dialog.Title>
          <WalletOptions />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
