'use client';

import { Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Todo App',
//   description: 'Simple app to organise your daily tasks',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
