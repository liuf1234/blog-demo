import { InputHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function GlassInput({
  label,
  className = '',
  ...props
}: GlassInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-white mb-1">{label}</label>
      )}
      <input className={`glass-input w-full px-4 py-2 ${className}`} {...props} />
    </div>
  );
}
