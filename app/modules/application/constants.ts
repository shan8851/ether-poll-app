import type { Abi } from 'abitype';
import { Hex } from 'viem';
import fullAbi from '../../abis/EtherPoll.json';

export const ABI: Abi = fullAbi.abi as Abi;
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as Hex;
