
import './globals.css'; // Optional if using global CSS
import React from 'react';

export const metadata = {
  title: 'NoLimitsAI',
  description: 'AI Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
