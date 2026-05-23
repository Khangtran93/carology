// src/app/fonts/fonts.ts
import localFont from 'next/font/local';
import {Inter} from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
})

export const logoFont = localFont({
  src: './postnobillscolombo-bold.ttf',
});

export const bebasNeue = localFont({
  src: './BebasNeue-Regular.ttf',
  variable: '--font-bebas-neue',
})

export const dmSans = localFont({
  src: './DMSans-VariableFont_opsz,wght.ttf',
  variable: '--font-dm-sans',
})

export const dmMono = localFont({
  src: './DMMono-Regular.ttf',
  variable: '--font-dm-mono',
})