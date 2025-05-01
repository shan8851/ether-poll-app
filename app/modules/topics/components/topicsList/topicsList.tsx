'use client'

import { useMemo } from 'react'
import { useReadContract, useReadContracts } from 'wagmi'
import type { Abi } from 'abitype'
import fullAbi from '../../../../abis/EtherPoll.json'
import { useQuery } from '@tanstack/react-query'
import { Topic, TopicTuple } from './types'



/* ─────────────────────────── constants ─ */
const ABI: Abi = fullAbi.abi as Abi
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
const GATEWAY= process.env.NEXT_PUBLIC_GATEWAY_URL!

const fetchJson = (cid: string) =>
  fetch(`${GATEWAY}${cid}`).then(r => r.json())

/* ─────────────────────────── component ─ */
export const TopicsList: React.FC = () => {
  /* 1 — how many topics? */
  const { data: nextId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi:     ABI,
    functionName: 'nextTopicId',
  })
  const count = Number(nextId ?? 0)
  const ids   = [...Array(count).keys()]

  /* 2 — batch-read tuples */
  const {
    data: tuples,
    isLoading: isStructsLoading,
  } = useReadContracts({
    allowFailure: false,
    contracts: ids.map(id => ({
      address: CONTRACT_ADDRESS,
      abi:     ABI,
      functionName: 'topics',
      args:    [BigInt(id)] as const,
    })),
    query: { enabled: count > 0 },
  })

  /* 3 — project tuples → objects */
  const topics: Topic[] = useMemo(() => {
    if (!tuples) return []
    return (tuples as TopicTuple[]).map(
      ([creator, metadataCid, end, yes, no]) => ({
        creator,
        metadataCid,
        endTimestamp: Number(end),
        yesVotes: yes,
        noVotes:  no,
      }),
    )
  }, [tuples])

  /* 4 — off-chain metadata */
  const cids = topics.map(t => t.metadataCid)
  const {
    data: metas = [],
    isLoading: isMetaLoading,
  } = useQuery({
    queryKey: ['topic-metas', cids],
    enabled:  cids.length > 0,
    queryFn:  () => Promise.all(cids.map(cid => fetchJson(cid))),
    staleTime: 5 * 60_000,
    gcTime:    30 * 60_000,
  })

  /* ─ guards ─ */
  if (isStructsLoading || isMetaLoading)
    return <p className="text-textSecondary">Loading topics…</p>

  if (topics.length === 0)
    return <p className="text-textSecondary">No topics yet.</p>

  /* ─ render ─ */
  return (
    <div className="grid gap-6 mt-8">
      {topics.map((t, i) => {
        const m = metas[i] as
          | { title?: string; description?: string; links?: { name: string; url: string }[] }
          | undefined

        return (
          <article
            key={i}
            className="bg-surface p-6 rounded shadow text-text space-y-2"
          >
            <header className="space-y-1">
              <h3 className="text-xl font-semibold break-words">
                {m?.title ?? '(untitled)'}
              </h3>
              {m?.description && (
                <p className="text-textSecondary line-clamp-3">
                  {m.description}
                </p>
              )}
            </header>

            {m?.links?.length && (
              <ul className="list-disc ml-5 space-y-1 text-sm">
                {m.links.map(l => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      className="text-purple underline break-all"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <footer className="text-xs text-textSecondary flex justify-between pt-2">
              <span>ID&nbsp;#{i}</span>
              <span>
                yes {t.yesVotes.toString()} / no {t.noVotes.toString()}
                {' · closes '}
                {new Date(t.endTimestamp * 1_000).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                })}
              </span>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
