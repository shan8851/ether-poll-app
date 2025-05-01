import { Hex } from "viem"
import { useReadContract } from "wagmi"
import type { Abi } from 'abitype'


export interface IUseTopicCountParams {
  address: Hex
  abi:     Abi
}

export const useTopicCount = ({address, abi}: IUseTopicCountParams) => {
    const { data: nextId } = useReadContract({
      address,
      abi,
      functionName: 'nextTopicId',
    })

    const count = Number(nextId ?? 0)
    const ids   = [...Array(count).keys()]

    return {
      count,
      ids,
    }
}
