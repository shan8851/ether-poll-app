import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './modules/application/components/providers/providers';
import { Header } from './modules/application/components/header';
import { Space_Grotesk } from 'next/font/google';
import { Footer } from './modules/application/components/footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'EtherPoll',
  description:
    'Vote on the hottest topics in the Ethereum ecosystem. Zero noise. All signal.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'EtherPoll',
    description:
      'Vote on the hottest topics in the Ethereum ecosystem. Zero noise. All signal.',
    url: 'https://ether-poll-app.vercel.app',
    siteName: 'Shan8851',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://ether-poll-app.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'Shan8851 – Full Stack Web3 Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EtherPoll',
    description:
      'Vote on the hottest topics in the Ethereum ecosystem. Zero noise. All signal.',
    creator: '@shan8851',
    images: ['https://ether-poll-app.vercel.app/og.png'],
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
