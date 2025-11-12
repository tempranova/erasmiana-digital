'use client';
import { useState, useEffect } from 'react';

import Search from '@/components/search/search'
import SearchResults from '@/components/search/search-results'
import Pagination from '@/components/common/pagination';

export default function SearchContainer({ placeholder }) {

  const [ searchedText, setSearchedText ] = useState(false)
  const [ totalResults, setTotalResults ] = useState(false)
  const [ results, setResults ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ showKeywords, setShowKeywords ] = useState(false)
  const [ showThemes, setShowThemes ] = useState(false)

  return (
    <div className="cardo-regular">
      <div className="grid grid-cols-3 gap-8">
        <div>
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
        <div className="col-span-2">
          {results.length === 0 ? 
            <img src="/assets/erasmus-bg.jpg" className="rounded-md shadow-md" />
          : false}
          <div className="flex mb-4">
            {results.length > 0 ? 
              <div className="mr-auto flex items-center text-xs opacity-70">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={showKeywords} onChange={() => setShowKeywords(!showKeywords)} /> Show Keywords
                </div>
                <div className="ml-4 flex items-center">
                  <input type="checkbox" className="mr-2" checked={showThemes} onChange={() => setShowThemes(!showThemes)} /> Show Themes
                </div>
              </div>
            : false}
            <div className="ml-auto flex">
              <Pagination currentPage={page} totalResults={totalResults} resultsPerPage={10} onPageChange={setPage} />
            </div>
          </div>
          <SearchResults 
            results={results} 
            searchedText={searchedText}
            showKeywords={showKeywords}
            showThemes={showThemes}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  )

}
