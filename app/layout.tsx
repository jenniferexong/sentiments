import type { Metadata } from 'next';
import { Inter, Ubuntu_Mono, Reddit_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';

import '@/styles/globals.css';
import { cn } from '@/utils/cn';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const ubuntoMono = Ubuntu_Mono({
  weight: '400',
  variable: '--font-ubunto-mono',
  subsets: ['latin'],
});

const redditMono = Reddit_Mono({
  weight: '400',
  variable: '--font-reddit-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sentiments',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, ubuntoMono.variable, redditMono.variable)}
      >
        {children}
      </body>
    </html>
  );
}
