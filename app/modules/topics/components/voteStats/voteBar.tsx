import React from 'react';
import clsx from 'clsx';

export interface VoteBarProps {
  label: 'Yes' | 'No';
  value: number; // Percentage (0-100)
  count: number;
  color: 'green' | 'red'; // Tailwind color key
  showEmptyMessage?: boolean; // Optional flag to show a "no votes" message
}

export const VoteBar: React.FC<VoteBarProps> = ({
  label,
  value,
  count,
  color,
  showEmptyMessage = false,
}) => {
  const totalVotes = count;
  const hasVotes = totalVotes > 0;

  const bgColor = {
    green: 'bg-green',
    red: 'bg-red',
  }[color];

  return (
    <div className="mb-4">
      <div
        className={clsx(
          'flex justify-between text-sm mb-1',
          hasVotes ? 'text-textSecondary' : 'text-textTertiary opacity-70'
        )}
      >
        <span>{label}</span>
        <span>
          {count} vote{count !== 1 ? 's' : ''} · {value}%
        </span>
      </div>

      <div className="w-full h-3 bg-surface rounded overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-500 ease-in-out', bgColor)}
          style={{ width: hasVotes ? `${value}%` : '0%' }}
        />
      </div>

      {showEmptyMessage && !hasVotes && (
        <div className="text-center text-sm text-textTertiary mt-2 italic">
          No votes yet. Be the first to signal.
        </div>
      )}
    </div>
  );
};
