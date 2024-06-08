import { Inter } from 'next/font/google';
import { Advent_Pro } from 'next/font/google';
import { Merriweather } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const adventPro = Advent_Pro({ subsets: ['latin'] });
export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
});
