import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function GlassButton({
  children,
  className = '',
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={`glass-button px-4 py-2 text-sm font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
