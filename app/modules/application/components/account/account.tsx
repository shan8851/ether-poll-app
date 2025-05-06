'use client';

import { Popover } from 'radix-ui';
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from 'wagmi';
import { shortenAddress } from '@/app/modules/application/utils/shortenAddress';
import { ConnectDialog } from '../connectDialog/connectDialog';
import Image from 'next/image';

export const Account: React.FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ens } = useEnsName({ address, chainId: 1 });
  const { data: avatar } = useEnsAvatar({ name: ens ?? undefined, chainId: 1 });

  if (!address) return <ConnectDialog />;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-full hover:bg-zinc-700 transition border border-zinc-700">
          {avatar ? (
            <Image
              src={avatar}
              alt="ENS Avatar"
              height={100}
              width={100}
              className="size-7 rounded-full"
            />
          ) : (
            <div className="size-7 bg-zinc-600 rounded-full" />
          )}
          <span className="text-sm text-white">
            {ens ?? shortenAddress(address)}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        sideOffset={8}
        className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl w-40 shadow-lg"
      >
        <button
          className="w-full text-left text-sm text-red-400 hover:text-red-300 transition"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </Popover.Content>
    </Popover.Root>
  );
};
