import toast from "react-hot-toast";
export interface IBlockExplorerToastParams {
  label: string;
  hash: string;
}

export const blockExplorerToast = ({label, hash }: IBlockExplorerToastParams) => toast.success(
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )
