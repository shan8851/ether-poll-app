'use client';

import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { sepolia } from 'viem/chains';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { usePinJson } from '../../../application/hooks/usePinJson';
import { FormValues } from './types';
import { blockExplorerToast } from '@/app/modules/application/components/blockExplorerToast';

const MAX_S = 90 * 24 * 60 * 60; // 90 days

export interface ICreateTopicFormProps {
  onClose: () => void;
}

export const CreateTopicForm: React.FC<ICreateTopicFormProps> = ({ onClose }) => {
  const { address } = useAccount();
  const { pinJson, loading: isPinning, error: pinError } = usePinJson();

  const {
    writeContractAsync,
    data: txHash,
    error: txError,
    status: txStatus,
  } = useWriteContract();

  const { data: receipt, isLoading: isMining } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: Boolean(txHash) },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      endDate: '',
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit = handleSubmit(async (v) => {
    if (!address) throw new Error('Connect your wallet');

    const nowS = Math.floor(DateTime.now().toSeconds());
    const endS = Math.floor(
      DateTime.fromISO(v.endDate, { zone: 'utc' }).endOf('day').toSeconds()
    );
    const duration = endS - nowS;

    if (duration <= 0) throw new Error('End date in the past');
    if (duration > MAX_S) throw new Error('End date must be ≤ 90 days');

    const res = await pinJson({
      title: v.title,
      description: v.description,
      links: v.links,
    });
    if (!res) return;
    const { cid } = res;

    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'createTopic',
      args: [cid, duration], // <-- duration, not timestamp
      chainId: sepolia.id,
    });

    reset();
  });

  const isBusy =
    isSubmitting || isPinning || txStatus === 'pending' || isMining;

  useEffect(() => {
    const label = isPinning
      ? 'Pinning data to IPFS…'
      : txStatus === 'pending'
      ? 'Sending transaction…'
      : isMining
      ? 'Confirming transaction…'
      : '';
    if (!receipt && (isPinning || txStatus === 'pending' || isMining)) {
      toast(label);
    }

    if (receipt) {
      blockExplorerToast({
        label: 'Topic created!',
        hash: receipt.transactionHash,
      });

      onClose();
    }
  }, [isBusy, isMining, txStatus, isPinning, receipt, onClose]);

  useEffect(() => {
    if (pinError) {
      toast.error(pinError.message);
    }
    if (txError) {
      toast.error(txError.message);
    }
  }, [pinError, txError]);

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-6 bg-surface text-text rounded shadow"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full bg-background border border-border rounded p-3
                     text-text placeholder-textSecondary
                     focus:outline-none focus:ring-2 focus:ring-purple"
          placeholder="Topic title"
          disabled={isBusy}
        />
        {errors.title && <p className="text-red">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full bg-background border border-border rounded p-3
                     text-text placeholder-textSecondary
                     focus:outline-none focus:ring-2 focus:ring-purple"
          rows={4}
          placeholder="Tell voters what this topic is about…"
          disabled={isBusy}
        />
        {errors.description && (
          <p className="text-red">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Links</label>
        {fields.map((f, i) => (
          <div key={f.id} className="flex gap-2 mt-2">
            <input
              {...register(`links.${i}.name`, { required: 'Name required' })}
              placeholder="Name"
              className="flex-1 bg-background border border-border rounded p-3
                         text-text placeholder-textSecondary
                         focus:outline-none focus:ring-2 focus:ring-purple"
              disabled={isBusy}
            />
            <input
              {...register(`links.${i}.url`, {
                required: 'URL required',
                pattern: {
                  value: /^https?:\/\//,
                  message: 'Must start with http:// or https://',
                },
              })}
              placeholder="https://…"
              className="flex-1 bg-background border border-border rounded p-3
                         text-text placeholder-textSecondary
                         focus:outline-none focus:ring-2 focus:ring-purple"
              disabled={isBusy}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="px-3 py-2 bg-red text-background rounded shadow
                         hover:bg-red/80 disabled:opacity-40"
              disabled={isBusy}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: '', url: '' })}
          className="mt-2 px-4 py-2 bg-purple text-background rounded shadow
                     hover:bg-purple/90 disabled:opacity-40"
          disabled={isBusy}
        >
          + Add Link
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">End Date</label>
        <input
          type="date"
          {...register('endDate', { required: 'End date is required' })}
          className="w-full bg-background border border-border rounded p-3
                     text-text placeholder-textSecondary
                     focus:outline-none focus:ring-2 focus:ring-purple"
          disabled={isBusy}
        />
        {errors.endDate && <p className="text-red">{errors.endDate.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="w-full py-3 bg-green text-background rounded shadow
                   hover:bg-green/90 disabled:opacity-40"
      >
        Create topic
      </button>
    </form>
  );
};
