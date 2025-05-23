import { useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';

export const useTopicCount = () => {
  const { data: nextId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'nextTopicId',
    chainId: base.id,
  });

  const count = Number(nextId ?? 0);
  const ids = [...Array(count).keys()];

  return { count, ids };
};
