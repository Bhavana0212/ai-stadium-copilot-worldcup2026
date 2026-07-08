import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Stadium Copilot | FIFA World Cup 2026',
  description: 'Production-style AI smart stadium platform for fans, operators, and sustainability teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
