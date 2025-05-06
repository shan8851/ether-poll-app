import { Description } from './modules/application/components/description';
import { TopicsList } from './modules/topics/components/topicsList';

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-8 max-w-5xl mx-auto py-6 space-y-6">
      <Description />
      <TopicsList />
    </div>
  );
}
