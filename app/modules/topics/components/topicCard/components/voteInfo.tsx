import { Hex } from "viem"
import { VoteOnTopic } from "../../voteOnTopic"

interface IVoteInfoProps {
  address?: Hex
  isExpired: boolean
  isVotedError: boolean
  hasVoted: unknown
  topicId: number
}

export const VoteInfo: React.FC<IVoteInfoProps> = ({address, isExpired, isVotedError, hasVoted, topicId}) => {
  if (!address && !isExpired) {
    return <p className="text-sm text-orange">🔌 Connect your wallet to vote</p>
  }
  if (isExpired) {
    return null
  }
  if (isVotedError) {
    return <p className="text-sm text-red">Error loading vote status</p>
  }
  if (hasVoted) {
    return (
      <div className="text-sm text-green font-medium flex items-center gap-2">
        🎉 You’ve already voted!
      </div>
    )
  }
  return <VoteOnTopic topicId={topicId} />
}
