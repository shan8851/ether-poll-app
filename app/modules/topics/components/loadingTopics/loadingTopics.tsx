import React from "react";

interface ILoadingTopicsProps {
  count?: number;
};

const SkeletonItem = () => (
  <div className="w-full rounded shadow bg-surface border border-border p-4 animate-pulse">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 rounded bg-textSecondary" />
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-textSecondary" />
          <div className="col-span-1 h-2 rounded bg-textSecondary" />
        </div>
        <div className="h-2 rounded bg-textSecondary" />
      </div>
    </div>
  </div>
);

export const LoadingTopics: React.FC<ILoadingTopicsProps> = ({ count = 1 }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </div>
  );
};
