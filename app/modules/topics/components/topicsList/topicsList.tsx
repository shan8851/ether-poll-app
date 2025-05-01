'use client';

import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import type { Abi } from 'abitype';
import fullAbi from '../../../../abis/EtherPoll.json';
import { Topic, TopicTuple } from './types';
import { useTopicCount } from '../../hooks/useTopicCount';
import { Hex } from 'viem';
import { EmptyList } from './components/emptyList';
import { LoadingTopics } from './components/loadingTopics';
import { TopicCard } from './components/topicCard';

const ABI: Abi = fullAbi.abi as Abi;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as Hex;

export const TopicsList: React.FC = () => {
  const { count, ids } = useTopicCount({ address: CONTRACT_ADDRESS, abi: ABI });

  const { data: tuples, isLoading: isStructsLoading } = useReadContracts({
    allowFailure: false,
    contracts: ids.map((id) => ({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'topics',
      args: [BigInt(id)] as const,
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
    <div className="grid gap-6 mt-8 px-8">
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
