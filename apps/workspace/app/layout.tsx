import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Before You Build · Analiz çalışma alanı',
  description: 'Talebi netleştir, kararları onayla, güvenle devret.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
