import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            NET-BRIDGE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Button asChild>
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-md"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/products"
              className="block text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button asChild className="w-full">
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
} 