import { blockExplorerToast } from '@/app/modules/application/components/blockExplorerToast';
import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export interface IVoteOnTopicProps {
  topicId: number;
}

export const VoteOnTopic: React.FC<IVoteOnTopicProps> = ({ topicId }) => {
  const {
    writeContractAsync,
    data: txHash,
    error: txError,
  } = useWriteContract();

  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: Boolean(txHash) },
  });

  const onVote = async (support: boolean) => {
    toast(`Transaction pending…`);
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'voteOnTopic',
      args: [topicId, support],
    });
  };

  useEffect(() => {
    if (txError) {
      toast.error('Something went wrong, please try again');
    }
    if (receipt) {
      blockExplorerToast({
        hash: receipt.transactionHash,
        label: 'Vote submitted!',
      });
    }
  }, [txError, receipt]);

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="px-5 py-2 rounded-full text-sm font-semibold border border-green text-green hover:bg-green/10 transition disabled:opacity-50"
        disabled={isLoading}
        onClick={() => onVote(true)}
      >
        ✅ Yes
      </button>
      <button
        className="px-5 py-2 rounded-full text-sm font-semibold border border-red text-red hover:bg-red/10 transition disabled:opacity-50"
        disabled={isLoading}
        onClick={() => onVote(false)}
      >
        ❌ No
      </button>
    </div>
  );
};
