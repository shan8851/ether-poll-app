import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask()],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
});
