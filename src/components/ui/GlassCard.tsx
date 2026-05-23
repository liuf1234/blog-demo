import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
