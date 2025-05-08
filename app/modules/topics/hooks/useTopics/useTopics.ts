'use client'

import { useMemo } from 'react'
import { sepolia } from 'viem/chains'
import { useReadContracts } from 'wagmi'
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants'
import { useTopicCount } from '../useTopicCount'
import { Topic } from '../../components/topicsList/types'
import { sortByIdDesc, splitTopics, tupleToTopic } from '../../components/topicsList/helpers'

export const useTopics = () => {
  const { count, ids } = useTopicCount()

  const { data: tuples, isLoading } = useReadContracts({
    allowFailure: false,
    contracts: ids.map((id) => ({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'topics',
      args: [BigInt(id)] as const,
      chainId: sepolia.id,
    })),
    query: { enabled: count > 0 },
  })

  const topics = useMemo<Topic[]>(() => {
    if (!tuples) return []
    return (tuples as unknown as [`0x${string}`, string, bigint, bigint, bigint][])
      .map((tup, i) => tupleToTopic(tup, ids[i]))
  }, [tuples, ids])

  const { active, expired } = useMemo(() => {
    const split = splitTopics(topics)
    return {
      active: sortByIdDesc(split.active),
      expired: sortByIdDesc(split.expired),
    }
  }, [topics])

  return {
    isLoading,
    hasTopics: count > 0 && topics.length > 0,
    activeTopics: active,
    expiredTopics: expired,
    isEmpty: count > 0 && topics.length === 0,
  }
}
