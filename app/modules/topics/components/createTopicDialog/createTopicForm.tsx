'use client';

import { ABI, CONTRACT_ADDRESS } from '@/app/modules/application/constants';
import { useEffect, useRef } from 'react';
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
import { Select } from 'radix-ui';
import { DURATIONS, MAX_SECONDS } from './constants';

export interface ICreateTopicFormProps {
  onClose: () => void;
}

export const CreateTopicForm: React.FC<ICreateTopicFormProps> = ({
  onClose,
}) => {
  const hasNotified = useRef(false);

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
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      duration: DURATIONS[0].seconds,
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit = handleSubmit(async (v) => {
    if (!address) throw new Error('Connect your wallet');

    const duration = Number(v.duration);

    if (!duration || duration <= 0 || duration > MAX_SECONDS) {
      throw new Error('Invalid duration selected');
    }

    hasNotified.current = false;

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
      args: [cid, duration],
      chainId: sepolia.id,
    });

    reset();
  });

  const isBusy =
    isSubmitting || isPinning || txStatus === 'pending' || isMining;

  useEffect(() => {
    const label = isPinning
      ? '📦 Pinning data to IPFS…'
      : txStatus === 'pending'
      ? '📝 Awaiting wallet signature...'
      : isMining
      ? '⛏️ Confirming on-chain…'
      : '';

    if (!receipt && (isPinning || txStatus === 'pending' || isMining)) {
      toast.loading(label, {
        id: 'status-toast',
        duration: Infinity,
      });
    }

    if (receipt && !isMining && !hasNotified.current) {
      hasNotified.current = true;

      toast.dismiss('status-toast');

      blockExplorerToast({
        label: '✅ Topic created!',
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-xs uppercase font-semibold text-textSecondary mb-1">
          Title
        </label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full rounded-lg bg-background border border-border p-3
             text-sm placeholder-textTertiary focus:outline-none
             focus:ring-2 focus:ring-purple/50 transition"
          placeholder="Topic title"
          disabled={isBusy}
        />
        {errors.title && <p className="text-red">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold text-textSecondary mb-1">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full rounded-lg bg-background border border-border p-3
             text-sm placeholder-textTertiary focus:outline-none
             focus:ring-2 focus:ring-purple/50 transition"
          rows={4}
          placeholder="Tell voters what this topic is about…"
          disabled={isBusy}
        />
        {errors.description && (
          <p className="text-red">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">Links</label>
        {fields.map((f, i) => (
          <div key={f.id} className="flex gap-2 mb-4">
            <input
              {...register(`links.${i}.name`, { required: 'Name required' })}
              placeholder="Name"
              className="w-full rounded-lg bg-background border border-border p-3
             text-sm placeholder-textTertiary focus:outline-none
             focus:ring-2 focus:ring-purple/50 transition"
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
              className="w-full rounded-lg bg-background border border-border p-3
             text-sm placeholder-textTertiary focus:outline-none
             focus:ring-2 focus:ring-purple/50 transition"
              disabled={isBusy}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="px-3 py-2 bg-red text-background rounded
                         hover:bg-red/80 disabled:opacity-40"
              disabled={isBusy}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-purple border border-purple px-4 py-2 rounded-full hover:bg-purple/10 transition"
          onClick={() => append({ name: '', url: '' })}
        >
          + Add Link
        </button>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold text-textSecondary mb-1">
          Duration
        </label>
        <Select.Root
          onValueChange={(value) => setValue('duration', Number(value))}
          disabled={isBusy}
          defaultValue={String(DURATIONS[0].seconds)}
        >
          <Select.Trigger
            className="w-full rounded-lg bg-background border border-border p-3 text-sm text-left
                 placeholder-textTertiary focus:outline-none focus:ring-2 focus:ring-purple/50 transition"
          >
            <Select.Value placeholder="Select a duration" />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 bg-surface border border-border rounded shadow-md">
              <Select.Viewport className="p-1">
                {DURATIONS.map(({ label, seconds }) => (
                  <Select.Item
                    key={seconds}
                    value={String(seconds)}
                    className="px-3 py-2 text-sm text-text hover:bg-background cursor-pointer rounded"
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        {errors.duration && (
          <p className="text-red">{errors.duration.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green text-background rounded-xl text-sm font-semibold
             hover:bg-green/90 disabled:opacity-50 transition"
        disabled={isBusy}
      >
        Create Topic
      </button>
    </form>
  );
};
