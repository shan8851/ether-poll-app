'use client';

import { Popover } from 'radix-ui';
import {
  useAccount,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
  useSwitchChain,
} from 'wagmi';
import { shortenAddress } from '@/app/modules/application/utils/shortenAddress';
import { ConnectDialog } from '../connectDialog/connectDialog';
import Image from 'next/image';
import { base } from 'viem/chains';

export const Account: React.FC = () => {
  const { address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ens } = useEnsName({ address, chainId: 1 });
  const { data: avatar } = useEnsAvatar({ name: ens ?? undefined, chainId: 1 });
  const { switchChain } = useSwitchChain();

  if (!address) return <ConnectDialog />;

  if (chainId !== base.id)
    return (
      <button
        onClick={() => switchChain({ chainId: base.id })}
        className="bg-purple text-background px-4 py-2 font-bold rounded hover:bg-purple/75"
      >
        Switch to Base
      </button>
    );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full hover:bg-surface/30 transition border border-border">
          {avatar ? (
            <Image
              src={avatar}
              alt="ENS Avatar"
              height={100}
              width={100}
              className="size-7 rounded-full"
            />
          ) : (
            <div className="size-7 bg-orange/60 rounded-full" />
          )}
          <span className="text-sm text-white">
            {ens ?? shortenAddress(address)}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        sideOffset={8}
        className="bg-surface border border-border p-2 rounded-xl w-40 shadow-lg"
      >
        <button
          className="w-full text-center text-sm text-red hover:text-red/70 transition"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </Popover.Content>
    </Popover.Root>
  );
};
