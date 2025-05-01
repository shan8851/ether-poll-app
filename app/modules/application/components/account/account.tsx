"use client";

import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { ConnectDialog } from '../connectDialog/connectDialog';
import { shortenAddress } from '@/app/modules/application/utils/shortenAddress';

export const Account: React.FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: ens } = useEnsName({
    address,
    chainId: 1,
  });

  if (!address) return <ConnectDialog />;

  return (
    <div className="flex gap-2 items-center shrink-0">
      <p className="shrink-0 text-textSecondary">
        Address:{' '}
        <span className="text-text">{ens ?? shortenAddress(address)}</span>
      </p>
      <button
        className="text-orange hover:underline"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};
