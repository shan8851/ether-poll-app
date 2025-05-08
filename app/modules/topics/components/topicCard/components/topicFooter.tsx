import { formatUnixDate } from "../../../utils/formatUnixDate"

interface ITopicFooterProps {
  topicId: number
  endTimestamp: number
  isExpired: boolean
}

export const TopicFooter: React.FC<ITopicFooterProps> = ({topicId, endTimestamp, isExpired}) => {
  return (
          <footer className="text-xs text-textTertiary border-t border-border pt-3 flex justify-between items-center">
        <span>ID #{topicId} — {isExpired ? 'Ended' : 'Ends'}: {formatUnixDate(endTimestamp)}</span>

        {isExpired && <span title="Voting period ended">⏰</span>}
      </footer>
  )
}
