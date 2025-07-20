"use client";

import { usePaginatedQuery, useQuery } from 'convex/react';
import { NavBar } from './navbar';
import { TamplatesGallary } from './tamplates-gallary';
import { api } from '../../../convex/_generated/api';
import { DocumentsTable } from './documents-table';

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(api.document.getAllDocuments, {}, { initialNumItems: 5 });

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <NavBar />
      </div>
      <div className='mt-16'>
        <TamplatesGallary />

        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />

      </div>
    </div>
  );
}
