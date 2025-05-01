// Shorten wallet address to 4 characters at the beginning and end
export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
