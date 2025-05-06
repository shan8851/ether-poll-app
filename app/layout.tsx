import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './modules/application/components/providers/providers';
import { Header } from './modules/application/components/header';
import { Space_Grotesk } from 'next/font/google';
import { Footer } from './modules/application/components/footer';

export const metadata: Metadata = {
  title: 'EtherPoll',
  description: 'Vote on hot topics in the ethereum ecosystem',
  icons: {
    icon: '/favicon.png',
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
