
// frontend/app/layout.tsx

import './globals.css'; // Only if you have global styles

export const metadata = {
  title: 'NoLimitsAI',
  description: 'Your AI assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
