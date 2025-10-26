'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Search({ setResults }) {

  const [ searchText, setSearchText ] = useState("")

  const doSearch = async () => {
    const searchResults = await fetch('/api/search', {
      method : "POST",
      body : JSON.stringify({
        search : searchText
      })
    }).then(resp => resp.json())

    if(searchResults.error) {
      toast(searchResults.error)
    } else if(searchResults.length === 0) {
      toast("No results found.")
    } else {
      setResults(searchResults)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <textarea
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-4 bg-white border border-black text-black w-full rounded-md"
          placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
        />
        <div
          onClick={() => doSearch()}
          className="-mt-1 w-[100px] bg-black border border-gray-500 text-white text-xl text-center px-4 py-2 rounded-md w-full cursor-pointer hover:bg-gray-900">
          Search
        </div>
      </div>
    </div>
  )

}
