import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './modules/application/components/providers/providers';
import { Header } from './modules/application/components/header';
import { Space_Grotesk } from 'next/font/google';
import { Footer } from './modules/application/components/footer';
import { Toaster } from 'react-hot-toast';

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
        <Toaster
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
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
