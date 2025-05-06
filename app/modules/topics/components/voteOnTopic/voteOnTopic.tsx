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
        className="bg-green text-background px-4 py-2 rounded hover:bg-green/70"
        disabled={isLoading}
        onClick={() => onVote(true)}
      >
        YES
      </button>
      <button
        className="bg-red text-background px-4 py-2 rounded hover:bg-red/70"
        disabled={isLoading}
        onClick={() => onVote(false)}
      >
        NO
      </button>
    </div>
  );
};
