import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../components/topicsList/helpers";
import { TopicMetadata } from "../../components/topicsList/types";

interface IUseTopicMetadataParams {
  cid: string
}

export const STALE_TIME = 15 * 60_000;
export const GC_TIME = 30 * 60_000;

export interface UseTopicMetadataReturn {
  metadata: TopicMetadata | undefined;
  isMetaLoading: boolean;
}

export const useTopicMetadata = ({cid}: IUseTopicMetadataParams): UseTopicMetadataReturn => {
    const { data: metadata, isLoading: isMetaLoading } = useQuery<TopicMetadata>({
      queryKey: ['topic-metadata', cid],
      queryFn: () => fetchJson(cid),
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
    });

    return { metadata, isMetaLoading }
}
