"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../../../../config/wagmiConfig";

export interface IProvidersProps {
  children?: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <Toaster position="top-right" toastOptions={{ duration: 15000 }} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
