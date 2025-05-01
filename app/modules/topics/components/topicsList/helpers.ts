import { TopicMetadata } from './types';

export const fetchJson = async (cid: string): Promise<TopicMetadata> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL!}${cid}`);
  const json = await res.json();

  return json;
};
