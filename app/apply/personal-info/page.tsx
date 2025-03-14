import { Spacer } from '@/components/ui/spacer';
import { Form } from './Form';

export default function Home() {
  return (
    <div className=' flex flex-col justify-between h-[calc(100vh-15rem)]'>
      <div>
        <h4> Personal info </h4>
        <Spacer size={12} />

        <Form />
      </div>
    </div>
  );
}
