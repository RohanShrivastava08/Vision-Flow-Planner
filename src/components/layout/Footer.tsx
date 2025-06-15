// src/components/layout/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background/80 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Vision Flow. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Powered by AI</span>
            <span className="text-lg text-amber-500">✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
