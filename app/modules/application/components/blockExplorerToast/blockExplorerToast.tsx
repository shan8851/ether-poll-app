import toast from "react-hot-toast";
export interface IBlockExplorerToastParams {
  label: string;
  hash: string;
}

export const blockExplorerToast = ({ label, hash }: IBlockExplorerToastParams) =>
  toast.success(
    <div className="text-sm text-text shadow-lg space-y-2">
      <p>{label}</p>
      <a
        href={`https://sepolia.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple underline hover:text-purple/80"
      >
        View on Etherscan
      </a>
    </div>
  );
