import React from 'react';
import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: 'InnoVerse',
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <title>InnoVerse</title>
        <meta name="description" content="***STRING_REMOVED***  Innovation Platform" />
      </head>
      <body style={{ background: 'linear-gradient(90deg, rgb(0, 66, 103) 0%, rgb(0, 90, 140) 100%)' }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
