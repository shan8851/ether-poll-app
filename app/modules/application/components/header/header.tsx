import { Account } from "@/app/modules/application/components/account";
import { CreateTopicDialog } from "@/app/modules/topics/components/createTopicDialog";

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-3xl text-pink font-extrabold">EtherPoll</h1>
      <div className="flex items-center gap-2">
        <CreateTopicDialog />
        <Account />
      </div>
    </div>
  );
};
