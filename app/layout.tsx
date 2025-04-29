import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers/providers';

export const metadata: Metadata = {
  title: 'EtherPoll',
  description: 'Vote on hot topics in the ethereum ecosystem',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
