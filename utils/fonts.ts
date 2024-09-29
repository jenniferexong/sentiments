import { Inter, Reddit_Mono, Ubuntu_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const sentiments = localFont({
  src: [
    {
      path: '../assets/fonts/Sentiments-Regular.ttf',
      weight: '400',
    },
    {
      path: '../assets/fonts/Sentiments-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-sentiments',
});

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const ubuntoMono = Ubuntu_Mono({
  weight: '400',
  variable: '--font-ubunto-mono',
  subsets: ['latin'],
});

export const redditMono = Reddit_Mono({
  weight: '400',
  variable: '--font-reddit-mono',
  subsets: ['latin'],
});
