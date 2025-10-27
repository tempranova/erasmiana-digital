'use client';
import { useState } from 'react';

import Search from '@/components/search/search'
import SearchResults from '@/components/search/search-results'

export default function SearchContainer({ placeholder, searchTitle }) {

  const [ results, setResults ] = useState([])

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="text-black cardo-regular text-xl">
        <Search
          placeholder={placeholder}
          setResults={setResults}
        />
      </div>
      <SearchResults results={results} />
    </div>
  )

}
