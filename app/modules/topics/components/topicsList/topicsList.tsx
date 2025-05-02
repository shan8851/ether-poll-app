'use client';

import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import { Topic, TopicTuple } from './types';
import { useTopicCount } from '../../hooks/useTopicCount';
import { EmptyList } from '../emptyList/emptyList';
import { LoadingTopics } from '../loadingTopics';
import { TopicCard } from '../topicCard';
import { sepolia } from 'viem/chains';
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';

export const TopicsList: React.FC = () => {
  const { count, ids } = useTopicCount();

  console.log('ids', ids);

  const { data: tuples, isLoading: isStructsLoading } = useReadContracts({
    allowFailure: false,
    contracts: ids.map((id) => ({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'topics',
      args: [BigInt(id)] as const,
      chainId: sepolia.id,
    })),
    query: { enabled: count > 0 },
  });

  const topics: Topic[] = useMemo(() => {
    if (!tuples) return [];
    return (tuples as TopicTuple[]).map(
      ([creator, metadataCid, end, yes, no]) => ({
        creator,
        metadataCid,
        endTimestamp: Number(end),
        yesVotes: yes,
        noVotes: no,
      })
    );
  }, [tuples]);

  const cids = topics.map((topic) => topic.metadataCid);

  if (isStructsLoading) return <LoadingTopics count={3} />;

  if (topics.length === 0) return <EmptyList />;

  return (
    <div className="grid gap-6 mt-8">
      {topics.map((topic, index) => (
        <TopicCard
          cid={cids[index]}
          key={index}
          topicId={index}
          yesVotes={topic.yesVotes.toString()}
          noVotes={topic.noVotes.toString()}
          endTimestamp={topic.endTimestamp}
        />
      ))}
    </div>
  );
};
