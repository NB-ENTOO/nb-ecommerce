import { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';
import { Footer } from '../navigation/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 