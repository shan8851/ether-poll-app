import { useTopicMetadata } from '../../../hooks/useTopicMetadata';
import { LoadingTopics } from './loadingTopics';

interface ITopicCardProps {
  topicId: number;
  yesVotes: string;
  noVotes: string;
  endTimestamp: number;
  cid: string;
}

export const TopicCard: React.FC<ITopicCardProps> = (props) => {
  const { cid, topicId, yesVotes, noVotes, endTimestamp } = props;

  const { metadata, isMetaLoading } = useTopicMetadata({ cid });

  if (isMetaLoading) return <LoadingTopics />;
  if (!metadata) return null;

  const { title, description, links } = metadata;

  return (
    <article className="bg-surface p-6 rounded shadow text-text space-y-2">
      <header className="space-y-1">
        <h3 className="text-xl font-semibold break-words">{title}</h3>
        {description && (
          <p className="text-text line-clamp-3">{description}</p>
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

      <footer className="text-xs text-text flex justify-between pt-2">
        <span>ID&nbsp;#{topicId}</span>
        <span>
          yes {yesVotes.toString()} / no {noVotes.toString()}
          {' · closes '}
          {new Date(endTimestamp * 1_000).toLocaleDateString(undefined, {
            dateStyle: 'medium',
          })}
        </span>
      </footer>
    </article>
  );
};
