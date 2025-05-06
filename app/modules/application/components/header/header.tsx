import { Account } from "@/app/modules/application/components/account";
import { CreateTopicDialog } from "@/app/modules/topics/components/createTopicDialog";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Centered on mobile, left-aligned on sm+ */}
        <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
          <span className="text-xl">🔮</span>
          <h1 className="text-2xl font-bold text-text">EtherPoll</h1>
        </div>

        {/* Centered on mobile, right-aligned on sm+ */}
        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <CreateTopicDialog />
          <Account />
        </div>
      </div>
    </header>
  );
};
