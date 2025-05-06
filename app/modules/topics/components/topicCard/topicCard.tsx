import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useAccount, useReadContract } from 'wagmi';
import { useTopicMetadata } from '../../hooks/useTopicMetadata';
import { SkeletonItem } from '../loadingTopics/loadingTopics';
import { VoteOnTopic } from '../voteOnTopic';
import { VoteStats } from '../voteStats/voteStats';

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
    <article className="bg-surface p-6 rounded shadow text-text space-y-2">
      <header className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold break-words">{title}</h3>
          {isExpired ? (
            <span className="text-red">Expired</span>
          ) : (
            <span className="text-green">Active</span>
          )}
        </div>
        {description && (
          <p className="text-textTertiary line-clamp-3">{description}</p>
        )}
      </header>

      {links?.length && (
        <ul className="list-disc ml-5 space-y-1 text-sm">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                className="text-orange hover:underline break-all"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      <VoteStats yesCount={Number(yesVotes)} noCount={Number(noVotes)} />
      {!address && !isExpired && <p>Connect your wallet to have your say!</p>}
      {address && !isExpired && (
        <>
          {isVotedLoading ? (
            <p className="text-sm text-textTertiary">Checking vote status…</p>
          ) : isVotedError ? (
            <p className="text-sm text-red">Error loading vote status</p>
          ) : hasVoted ? (
            <p className="text-sm font-medium text-text">
              🎉 You’ve already voted!
            </p>
          ) : (
            <VoteOnTopic topicId={topicId} />
          )}
        </>
      )}

      <footer className="text-xs text-textTertiary flex justify-between pt-2">
        <span>
          ID&nbsp;#{topicId} - {isExpired ? 'Ended' : 'Ends'}:{' '}
          {new Date(endTimestamp * 1_000).toLocaleDateString(undefined, {
            dateStyle: 'medium',
          })}
        </span>
        {isExpired && (
          <span className="text-red-500" title="Voting period has elapsed">
            ⏰
          </span>
        )}
      </footer>
    </article>
  );
};
