import { SkeletonItem } from '@/app/modules/application/components/skeletonItem/skeletonItem';
import { VoteStats } from '../voteStats/voteStats';
import { useTopicCardData } from '../../hooks/useTopicCardData';
import { TopicHeader } from './components/topicHeader';
import { TopicLinks } from './components/topicLinks';
import { VoteInfo } from './components/voteInfo';
import { TopicFooter } from './components/topicFooter';

export interface ITopicCardProps {
  topicId: number;
  yesVotes: string;
  noVotes: string;
  endTimestamp: number;
  cid: string;
}

export const TopicCard: React.FC<ITopicCardProps> = ({
  cid,
  topicId,
  yesVotes,
  noVotes,
  endTimestamp,
}) => {
  const {
    address,
    isExpired,
    metadata,
    isMetaLoading,
    hasVoted,
    isVotedLoading,
    isVotedError,
  } = useTopicCardData(topicId, cid, endTimestamp);

  if (isMetaLoading || isVotedLoading) return <SkeletonItem />;
  if (!metadata) return null;

  return (
    <article className="bg-surface p-6 rounded-2xl shadow-md space-y-5 text-text border border-border transition hover:shadow-">
      <TopicHeader
        title={metadata.title}
        description={metadata.description}
        isExpired={isExpired}
      />
      <TopicLinks links={metadata.links} />
      <VoteStats yesCount={Number(yesVotes)} noCount={Number(noVotes)} />
      <VoteInfo
        address={address}
        isExpired={isExpired}
        isVotedError={isVotedError}
        hasVoted={hasVoted}
        topicId={topicId}
      />

      <TopicFooter
        topicId={topicId}
        isExpired={isExpired}
        endTimestamp={endTimestamp}
      />
    </article>
  );
};
