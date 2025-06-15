// src/components/layout/Header.tsx
'use client';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { Lightbulb } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 border-b border-border/80 sticky top-0 z-50 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity duration-200">
          <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />
          Vision Flow
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
