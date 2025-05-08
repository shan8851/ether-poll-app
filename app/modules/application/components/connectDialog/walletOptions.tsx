"use client";

import { useConnect } from 'wagmi';

export const WalletOptions: React.FC = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col gap-y-2">
      {connectors.map((connector) => (
        <button
          className="bg-purple hover:bg-purple/75 text-background px-4 py-2 font-bold rounded"
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
};
