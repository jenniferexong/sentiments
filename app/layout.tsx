import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

import '@/styles/globals.css';
import { inter, redditMono, sentiments, ubuntoMono } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Sentiments',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          ubuntoMono.variable,
          redditMono.variable,
          sentiments.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
