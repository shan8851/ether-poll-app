import { Account } from "./account"

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-3xl text-pink font-extrabold">EtherPoll</h1>
      <Account />
      </div>
  )
}
