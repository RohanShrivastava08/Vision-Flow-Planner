// src/components/layout/Header.tsx
'use client';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity">
          <Rocket className="h-6 w-6 sm:h-7 sm:w-7" />
          VisionFlow
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
