import { XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive',
        className
      )}
    >
      <XCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
} 