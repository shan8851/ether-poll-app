interface ITopicHeaderProps {
  title: string;
  description?: string;
  isExpired: boolean;
}

export const TopicHeader: React.FC<ITopicHeaderProps> = ({ title, description, isExpired }) => (
  <header className="…">
    <h3>{title}</h3>
    <span className={isExpired ? 'text-red' : 'text-green'}>
      {isExpired ? 'Expired' : 'Active'}
    </span>
    {description && <p className="…">{description}</p>}
  </header>
)
