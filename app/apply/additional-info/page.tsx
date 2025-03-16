import { AdditionalInfoForm } from './AdditionalInfoForm';

export default function Home() {
  return (
    <div className=' flex flex-col justify-between h-[calc(100vh-15rem)]'>
      <div>
        <AdditionalInfoForm />
      </div>
    </div>
  );
}
