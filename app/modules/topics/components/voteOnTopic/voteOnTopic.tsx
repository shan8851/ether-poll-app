import { blockExplorerToast } from '@/app/modules/application/components/blockExplorerToast';
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export interface IVoteOnTopicProps {
  topicId: number;
}

export const VoteOnTopic: React.FC<IVoteOnTopicProps> = ({ topicId }) => {
  const hasNotified = useRef(false);

  const queryClient = useQueryClient();

  const {
    writeContractAsync,
    data: txHash,
    error: txError,
  } = useWriteContract();

  const { data: receipt, isLoading: isMining } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: Boolean(txHash) },
  });

  const onVote = async (support: boolean) => {
    hasNotified.current = false;
    toast.loading('📝 Awaiting wallet signature...', {
      id: 'sign-tx',
      duration: Infinity,
    });

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'voteOnTopic',
        args: [topicId, support],
      });
      toast.dismiss('sign-tx');
      toast.loading('⛏️ Confirming on-chain…', {
        id: 'confirm-tx',
        duration: Infinity,
      });
    } catch (err) {
      console.error(err);
      toast.dismiss('sign-tx');
      toast.dismiss('confirm-tx');
      toast.error('❌ Transaction failed or rejected');
    }
  };

  useEffect(() => {
    if (txError) {
      toast.error('❌ Something went wrong');
      toast.dismiss('sign-tx');
      toast.dismiss('confirm-tx');
    }

    if (receipt && !isMining && !hasNotified.current) {
      hasNotified.current = true;
      toast.dismiss('confirm-tx');

      blockExplorerToast({
        label: '✅ Vote submitted!',
        hash: receipt.transactionHash,
      });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey?.[0] === 'readContracts',
      });
    }
  }, [receipt, isMining, txError, queryClient]);

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="px-5 py-2 rounded-full text-sm font-semibold border border-green text-green hover:bg-green/10 transition disabled:opacity-50 aria-disabled:pointer-events-none"
        disabled={isMining}
        aria-disabled={isMining}
        onClick={() => onVote(true)}
      >
        ✅ Yes
      </button>
      <button
        className="px-5 py-2 rounded-full text-sm font-semibold border border-red text-red hover:bg-red/10 transition disabled:opacity-50 aria-disabled:pointer-events-none"
        disabled={isMining}
        aria-disabled={isMining}
        onClick={() => onVote(false)}
      >
        ❌ No
      </button>
    </div>
  );
};
