import Navbar from '@/components/navbar';
import Providers from '@/providers';
import '@/styles/globals.css';
import type { LayoutProps } from '@/types';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Next App',
  description: 'This a next app template',
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Providers>
          <Navbar />
          <main className="container mt-5">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
