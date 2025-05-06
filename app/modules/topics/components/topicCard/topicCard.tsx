import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useAccount, useReadContract } from 'wagmi';
import { useTopicMetadata } from '../../hooks/useTopicMetadata';
import { SkeletonItem } from '../loadingTopics/loadingTopics';
import { VoteOnTopic } from '../voteOnTopic';
import { VoteStats } from '../voteStats/voteStats';
import clsx from 'clsx';

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
  const { address } = useAccount();

  const { metadata, isMetaLoading } = useTopicMetadata({ cid });

  const isExpired = Date.now() / 1_000 > endTimestamp;

  const {
    data: hasVoted,
    isLoading: isVotedLoading,
    isError: isVotedError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'hasUserVoted',
    args: [topicId, address],
    query: {
      enabled: Boolean(address) && !isExpired,
    },
  });

  if (isMetaLoading || isVotedLoading) return <SkeletonItem />;
  if (!metadata) return null;

  const { title, description, links } = metadata;

  return (
    <article className="bg-surface p-6 rounded-2xl shadow-md space-y-5 text-text border border-border transition hover:shadow-">
      {/* Header */}
      <header className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold break-words">{title}</h3>
          <span
            className={clsx(
              'text-sm font-medium',
              isExpired ? 'text-red' : 'text-green'
            )}
          >
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </div>
        {description && (
          <p className="text-sm text-textTertiary line-clamp-3">
            {description}
          </p>
        )}
      </header>

      {/* Links */}
      {links?.length && (
        <ul className="list-disc ml-5 space-y-1 text-sm text-orange">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-words"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Vote Stats */}
      <VoteStats yesCount={Number(yesVotes)} noCount={Number(noVotes)} />

      {/* User Interaction Section */}
      {address && !isExpired ? (
        isVotedLoading ? (
          <p className="text-sm text-textTertiary">Checking vote status…</p>
        ) : isVotedError ? (
          <p className="text-sm text-red">Error loading vote status</p>
        ) : hasVoted ? (
          <div className="text-sm text-green font-medium flex items-center gap-2">
            🎉 You’ve already voted!
          </div>
        ) : (
          <VoteOnTopic topicId={topicId} />
        )
      ) : (
        !address &&
        !isExpired && (
          <p className="text-sm text-orange">🔌 Connect your wallet to vote</p>
        )
      )}

      {/* Footer */}
      <footer className="text-xs text-textTertiary border-t border-border pt-3 flex justify-between items-center">
        <span>
          ID #{topicId} — {isExpired ? 'Ended' : 'Ends'}:{' '}
          {new Date(endTimestamp * 1_000).toLocaleDateString(undefined, {
            dateStyle: 'medium',
          })}
        </span>
        {isExpired && <span title="Voting period ended">⏰</span>}
      </footer>
    </article>
  );
};
