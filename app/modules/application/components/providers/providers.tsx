"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { Toaster } from 'react-hot-toast';
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../../../../config/wagmiConfig";

export interface IProvidersProps {
  children?: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#2b2d3c',
            color: '#f8f8f2',
            border: '1px solid #3f4154',
            fontSize: '14px',
            padding: '12px 16px',
            minWidth: '280px',
            maxWidth: '400px',
            borderRadius: '0.75rem',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1e1f29',
            },
          },
        }}
      /> */}

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
