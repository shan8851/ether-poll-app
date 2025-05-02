import { Description } from './modules/application/components/description';
import { Header } from './modules/application/components/header';
import { TopicsList } from './modules/topics/components/topicsList';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen py-2 space-y-4 px-8">
      <Header />
      <Description />
      <TopicsList />
    </div>
  );
}
