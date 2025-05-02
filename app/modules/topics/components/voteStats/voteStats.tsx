import React from 'react';
import { VoteBar } from './voteBar';

export interface VoteStatsProps {
  yesCount: number;
  noCount: number;
}

export const VoteStats: React.FC<VoteStatsProps> = ({ yesCount, noCount }) => {
  const total = yesCount + noCount;
  const yesPercent = total > 0 ? Math.round((yesCount / total) * 100) : 0;
  const noPercent = total > 0 ? 100 - yesPercent : 0;

  return (
    <div className="my-4">
      <VoteBar
        label="Yes"
        count={yesCount}
        value={yesPercent}
        color="green"
        showEmptyMessage={total === 0}
      />
      <VoteBar
        label="No"
        count={noCount}
        value={noPercent}
        color="red"
      />
    </div>
  );
};
