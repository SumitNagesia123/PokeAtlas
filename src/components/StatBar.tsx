import { STAT_COLORS, STAT_DISPLAY_NAMES } from '../utils/pokemon';
import { cn } from '../utils/cn';
import { useEffect, useState } from 'react';

interface StatBarProps {
  name: string;
  value: number;
  max?: number;
}

export function StatBar({ name, value, max = 255 }: StatBarProps) {
  const [width, setWidth] = useState(0);
  const displayName = STAT_DISPLAY_NAMES[name] || name;
  const color = STAT_COLORS[name] || '#9ca3af';
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    // Small delay to trigger animation after mount
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-xs font-medium text-gray-500 dark:text-gray-400 capitalize whitespace-nowrap">
        {displayName}
      </div>
      <div className="w-8 text-xs font-bold text-gray-800 dark:text-gray-200 text-right">
        {value}
      </div>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full stat-bar-fill"
          style={{
            width: `${width}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
