import { HistoryForm } from './HistoryForm';

export default function Home() {
  return (
    <div className=' flex flex-col justify-between h-[calc(100vh-15rem)] overflow-auto'>
      <div>
        <HistoryForm />
      </div>
    </div>
  );
}
