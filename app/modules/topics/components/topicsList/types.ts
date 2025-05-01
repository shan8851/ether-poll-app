export type TopicTuple = readonly [
  `0x${string}`,
  string,
  bigint,
  bigint,
  bigint
]

export interface Topic {
  creator:      `0x${string}`
  metadataCid:  string
  endTimestamp: number
  yesVotes:     bigint
  noVotes:      bigint
}

export type TopicMetadata = {
  title: string;
  description?: string;
  links?: { name: string; url: string }[];
};
