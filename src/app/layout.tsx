import type { Metadata } from 'next';
import '@/styles/globals.css';
import { IBM_Plex_Sans, Bowlby_One_SC } from 'next/font/google';

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm',
});

const bowlby = Bowlby_One_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bowlby',
});

export const metadata: Metadata = {
  title: 'Tiny Tools for Big Impact',
  description: 'Explore interactive scenarios that demonstrate how different approaches to AI and automation can transform journalism workflows.',
  icons: {
    icon: '/beaver.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${ibm.variable} ${bowlby.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
