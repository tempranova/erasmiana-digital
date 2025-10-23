'use client';
import { useEffect, useState } from 'react';

export default function Search() {

  const [ searchText, setSearchText ] = useState("")
  const [ results, setResults ] = useState([])

  const doSearch = async () => {
    const searchResults = await fetch('/api/search', {
      method : "POST",
      body : JSON.stringify({
        search : searchText
      })
    }).then(resp => resp.json())

    setResults(searchResults)
  }

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input className="w-3/4 p-4 bg-white border-1 border-slate-200 rounded-md" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button className="w-1/4 p-4 bg-green-950 rounded-md text-white text-xl" onClick={() => doSearch()}>Search</button>
      </div>

      <div>
        {results.map((result, i) => {
          return (
            <div key={`search-result-${i}`} className="mb-4 bg-white rounded-md p-4">
              {result.text}
              <div className="mt-4 text-sm">
                Result confidence: {result.distance}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}