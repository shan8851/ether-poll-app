'use client';

import { EmptyList } from '../emptyList/emptyList';
import { TopicCard } from '../topicCard';
import { useTopics } from '../../hooks/useTopics/useTopics';

export const TopicsList: React.FC = () => {
  const { isLoading, isEmpty, activeTopics, expiredTopics } = useTopics();

  if (isLoading) {
    return (
      <div className="text-center text-textSecondary mt-8">Loading...</div>
    );
  }
  if (isEmpty) {
    return <EmptyList />;
  }

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
