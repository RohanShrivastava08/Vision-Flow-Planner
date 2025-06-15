// src/components/layout/LoadingModal.tsx
'use client';

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  title: string;
  description: string;
}

export default function LoadingModal({ isOpen, title, description }: LoadingModalProps) {
  // Render nothing if not open, to avoid taking up space or causing issues.
  // AlertDialog handles its own visibility based on the 'open' prop.
  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md text-center">
        <AlertDialogHeader className="items-center">
          <Loader2 className="h-16 w-16 sm:h-20 sm:w-20 animate-spin text-primary mb-6" />
          <AlertDialogTitle className="text-2xl sm:text-3xl font-headline text-foreground">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base sm:text-lg text-muted-foreground mt-2 px-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* No AlertDialogFooter or action/cancel buttons are added, making it non-dismissible by user interaction.
            It will close only when the 'isOpen' prop becomes false. */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
