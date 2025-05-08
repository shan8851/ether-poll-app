import { Topic, TopicMetadata } from './types';

export const fetchJson = async (cid: string): Promise<TopicMetadata> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL!}${cid}`);
  const json = await res.json();

  return json;
};

/** Map raw tuple+id → typed Topic */
export function tupleToTopic(
  tuple: [`0x${string}`, string, bigint, bigint, bigint],
  id: number
): Topic {
  const [creator, metadataCid, end, yes, no] = tuple;
  return {
    creator,
    topicId: Number(id),
    metadataCid,
    endTimestamp: Number(end),
    yesVotes: yes,
    noVotes: no,
  };
}

/** Split into active vs expired */
export function splitTopics(topics: Topic[]) {
  const now = Date.now() / 1_000;
  const active: Topic[] = [];
  const expired: Topic[] = [];
  for (const t of topics) {
    if (t.endTimestamp > now) active.push(t);
    else expired.push(t);
  }
  return { active, expired };
}

/** Sort descending by topicId */
export function sortByIdDesc(topics: Topic[]) {
  return [...topics].sort((a, b) => b.topicId - a.topicId);
}
