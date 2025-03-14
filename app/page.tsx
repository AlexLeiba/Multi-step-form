import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className=' max-w-screen-2xl mx-auto px-6 py-6 flex flex-col justify-center items-center h-screen'>
      <div className='flex gap-3 items-center mb-3'>
        <h4>Apply for this job here</h4>
        <ArrowDown />
      </div>

      <Link href='/apply/personal-info'>
        <Button size={'lg'}>Apply</Button>
      </Link>
    </div>
  );
}
