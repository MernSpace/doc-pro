"use client";

import { useQuery } from 'convex/react';
import { NavBar } from './navbar';
import { TamplatesGallary } from './tamplates-gallary';
import { api } from '../../../convex/_generated/api';

export default function Home() {
  const documents = useQuery(api.document.getAllDocuments);

  if (documents === undefined) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <NavBar />
      </div>
      <div className='mt-16'>
        <TamplatesGallary />

      </div>
    </div>
  );
}
