import { formatName, TYPE_COLORS } from '../utils/pokemon';
import { cn } from '../utils/cn';

interface TypeBadgeProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ type, className, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] || '#888888';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-block font-semibold rounded-full text-white transition-transform hover:scale-105',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {formatName(type)}
    </span>
  );
}
