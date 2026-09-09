import { Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: { label: string; href: string };
}

export function EmptyState({
  title = 'Nothing here',
  message = 'Try adjusting your search or filters.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 p-3 rounded-full bg-gray-100 dark:bg-dark-700">
        <Inbox className="w-8 h-8 text-gray-400 dark:text-dark-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-dark-100">{title}</h3>
      <p className="text-gray-600 dark:text-dark-400 mb-6 max-w-md">{message}</p>
      {action && (
        <Link
          to={action.href}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
