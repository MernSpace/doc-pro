import Link from 'next/link'
import { NavBar } from './navbar';
import { TamplatesGallary } from './tamplates-gallary';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <NavBar/>
      </div>
      <div className='mt-16'>
        <TamplatesGallary/>
      </div>
    </div>
  );
}
