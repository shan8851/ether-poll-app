import { useAccount } from 'wagmi'
import { useReadContract } from 'wagmi'
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants'
import { sepolia } from 'viem/chains'
import { useTopicMetadata } from '../useTopicMetadata'

export const useTopicCardData = (topicId: number, cid: string, endTs: number) => {
  const { address } = useAccount()
  const isExpired = Date.now() / 1_000 > endTs

  const { metadata, isMetaLoading } = useTopicMetadata({ cid })

  const {
    data: hasVoted,
    isLoading: isVotedLoading,
    isError: isVotedError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'hasUserVoted',
    args: [BigInt(topicId), address] as const,
    chainId: sepolia.id,
    query: { enabled: Boolean(address) && !isExpired },
  })

  return {
    address,
    isExpired,
    metadata,
    isMetaLoading,
    hasVoted,
    isVotedLoading,
    isVotedError,
  }
}
