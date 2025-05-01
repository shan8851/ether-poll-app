import React from "react";

interface ILoadingTopicsProps {
  count?: number;
};

const SkeletonItem = () => (
  <div className="w-full max-w-sm rounded-md bg-surface border border-border p-4">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 rounded bg-gray-200" />
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200" />
          <div className="col-span-1 h-2 rounded bg-gray-200" />
        </div>
        <div className="h-2 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

export const LoadingTopics: React.FC<ILoadingTopicsProps> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </div>
  );
};
