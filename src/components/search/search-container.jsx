'use client';
import { useState, useEffect } from 'react';

import Search from '@/components/search/search'
import SearchResults from '@/components/search/search-results'

export default function SearchContainer({ placeholder }) {

  const [ searchedText, setSearchedText ] = useState(false)
  const [ totalResults, setTotalResults ] = useState(false)
  const [ results, setResults ] = useState([])
  const [ page, setPage ] = useState(1)

  return (
    <div className="mt-8">
      <div className="text-black cardo-regular text-xl">
        <Search
          placeholder={placeholder}
          searchedText={searchedText}
          setResults={setResults}
          setTotalResults={setTotalResults}
          setSearchedText={setSearchedText}
          page={page}
          setPage={setPage}
        />
      </div>
      <SearchResults 
        results={results} 
        searchedText={searchedText}
        page={page}
        setPage={setPage}
      />
      {results.length > 0 ? 
        <div className="mt-4 flex">
          {page > 1 ? 
            <div onClick={() => setPage(page - 1)} className="mr-auto cursor-pointer rounded-md text-sm bg-white p-2.5 hover:bg-gray-50">Previous Page</div>
          : false}
          {totalResults === false || totalResults > (page * 10) ? 
            <div onClick={() => setPage(page + 1)} className="ml-auto cursor-pointer rounded-md text-sm bg-white p-2.5 hover:bg-gray-50">Next Page</div>
          : false}
        </div>
      : false}
    </div>
  )

}
