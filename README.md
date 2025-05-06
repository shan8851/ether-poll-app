# 🔮 EtherPoll

Vote on Ethereum’s spiciest topics. One wallet, one vote. Zero noise, all signal.


## 🧠 What is EtherPoll?

**EtherPoll** is an Ethereum voting application designed for rapid community sentiment polling. Built with a clean, accessible UI and a Web3-native tech stack, it enables any wallet to create or vote on yes/no questions with time-limited windows.

## ✨ Features

- 🗳️ Wallet-gated yes/no voting
- 🧾 IPFS-pinned metadata for topic storage
- ⏳ Predefined durations (1 day, 1 week, 1 month, 3 months)
- ⚖️ One vote per address
- 🧠 React Hook Form validation
- 🎨 Dracula-inspired UI + Tailwind CSS styling
- 📦 Built with Viem + Wagmi v2 + Next.js App Router


## 🧱 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/blog/next-15)
- **Wallet + Contracts**: [Wagmi v2](https://wagmi.sh) + [Viem](https://viem.sh)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com)
- **Data Caching**: [React Query (TanStack)](https://tanstack.com/query/latest)



## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/shan8851/ether-poll-app.git
cd ether-poll-app
pnpm install
```

### 2. Configure env

Create a .env file based on the provided .env.example:

```bash
# Public keys for frontend access
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_ALCHEMY_API=your_alchemy_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_GATEWAY_URL=https://gateway.pinata.cloud/ipfs

# Private key for server-side pinning (used in server-only logic)
PINATA_JWT=your_pinata_jwt

```

### 3. Run the dev server

```bash
pnpm dev
```

## 🙋 Author

Created by [shan8851](https://shan8851.com)

## 🪪 License

MIT

Feel free to fork, build, and vote.
