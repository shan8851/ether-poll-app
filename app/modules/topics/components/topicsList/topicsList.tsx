'use client';

import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useMemo } from 'react';
import { sepolia } from 'viem/chains';
import { useReadContracts } from 'wagmi';
import { useTopicCount } from '../../hooks/useTopicCount';
import { EmptyList } from '../emptyList/emptyList';
import { TopicCard } from '../topicCard';
import { Topic, TopicTuple } from './types';

export const TopicsList: React.FC = () => {
  const { count, ids } = useTopicCount();

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
      ([creator, metadataCid, end, yes, no], i) => ({
        creator,
        topicId: Number(ids[i]),
        metadataCid,
        endTimestamp: Number(end),
        yesVotes: yes,
        noVotes: no,
      })
    );
  }, [tuples, ids]);

  const { activeTopics, expiredTopics } = useMemo(() => {
    const now = Date.now() / 1_000;
    const active: Topic[] = [];
    const expired: Topic[] = [];

    for (const t of topics) {
      if (t.endTimestamp > now) active.push(t);
      else expired.push(t);
    }

    const sortDesc = (a: Topic, b: Topic) => b.topicId - a.topicId;
    return {
      activeTopics: active.sort(sortDesc),
      expiredTopics: expired.sort(sortDesc),
    };
  }, [topics]);

  if (isStructsLoading)
    return (
      <div className="text-center text-textSecondary mt-8">Loading...</div>
    );
  if (count > 0 && topics.length === 0) return <EmptyList />;

  return (
    <div className="space-y-8 mt-8 mx-auto max-w-5xl w-full">
      {activeTopics.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">🟢 Active Topics</h2>
          <div className="grid gap-6">
            {activeTopics.map((t) => (
              <TopicCard
                key={t.topicId}
                cid={t.metadataCid}
                topicId={t.topicId}
                yesVotes={t.yesVotes.toString()}
                noVotes={t.noVotes.toString()}
                endTimestamp={t.endTimestamp}
              />
            ))}
          </div>
        </section>
      )}

      {expiredTopics.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">⏳ Expired Topics</h2>
          <div className="grid gap-6">
            {expiredTopics.map((t) => (
              <TopicCard
                key={t.topicId}
                cid={t.metadataCid}
                topicId={t.topicId}
                yesVotes={t.yesVotes.toString()}
                noVotes={t.noVotes.toString()}
                endTimestamp={t.endTimestamp}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
