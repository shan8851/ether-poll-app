export const VoteOnTopic: React.FC = () => {
  return (
    <div className="flex gap-4 mt-4">
    <button className="bg-green text-background px-4 py-2 rounded hover:bg-green/70">YES</button>
    <button className="bg-red text-background px-4 py-2 rounded hover:bg-red/70">NO</button>
  </div>
  )
}
