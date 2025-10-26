'use client';
import { useState } from 'react';

import Search from '@/components/search/search'
import SearchResults from '@/components/search/search-results'

export default function SearchContainer({ placeholder, searchTitle }) {

  const [ results, setResults ] = useState([])

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="text-black cardo-regular text-xl">
        <div className="ml-4 rounded-t-lg inline-block bg-gray-200 px-4 py-2 text-sm">{searchTitle}</div>
        <Search
          placeholder={placeholder}
          setResults={setResults}
        />
      </div>
      <div>
        <SearchResults results={results} />
      </div>
    </div>
  )

}
