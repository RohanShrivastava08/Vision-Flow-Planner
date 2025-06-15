// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background/80 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          
          <div className="flex space-x-4">
            <Link href="https://github.com/RohanShrivastava08" target="_blank" rel="noopener noreferrer" aria-label="Rohan Shrivastava's GitHub Profile">
              <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
            </Link>
            <Link href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/" target="_blank" rel="noopener noreferrer" aria-label="Rohan Shrivastava's LinkedIn Profile">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Vision Flow. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
            <span>Powered by AI</span>
            <span className="text-base text-amber-500">✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
