import clsx from "clsx";
import React from "react";

export interface VoteBarProps {
  label: "Yes" | "No";
  value: number; // Percentage (0-100)
  count: number;
  color: "green" | "red"; // Tailwind color key
}

export const VoteBar: React.FC<VoteBarProps> = ({ label, value, count, color }) => {
  const hasVotes = count > 0;
  const bgColor = {
    green: "bg-green",
    red: "bg-red",
  }[color];

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-textSecondary mb-1">
        <span>{label}</span>
        <span>
          {count} vote{count !== 1 ? "s" : ""} · {hasVotes ? `${value}%` : "0%"}
        </span>
      </div>

      <div className="w-full h-3 bg-background rounded overflow-hidden">
        {hasVotes && (
          <div
            className={clsx("h-full transition-all duration-500 ease-in-out", bgColor)}
            style={{ width: `${value}%` }}
          />
        )}
      </div>
    </div>
  );
};
