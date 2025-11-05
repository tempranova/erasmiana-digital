'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Search({ setResults, setPage, page, searchedText, setTotalResults, setSearchedText}) {

  const [ searchType, setSearchType ] = useState('semantic')
  const [ searchObjects, setSearchObjects ] = useState('all')
  const [ searchText, setSearchText ] = useState("")
  const [ paramsLoaded, setParamsLoaded ] = useState(false);

  const doSearch = async () => {
    let pageToSend = page;
    if(searchedText && searchedText !== searchText) {
      pageToSend = 1;
    }
    const searchResults = await fetch('/api/search', {
      method : "POST",
      body : JSON.stringify({
        type : searchType,
        objects : searchObjects,
        search : searchText,
        page : pageToSend
      })
    }).then(resp => resp.json())

    const url = new URL(window.location)
    url.searchParams.set("search", searchText)
    url.searchParams.set("objects", searchObjects)
    url.searchParams.set("type", searchType)
    url.searchParams.set("page", pageToSend)
    window.history.replaceState({}, "", url);

    if(searchResults.error) {
      toast(searchResults.error)
    } else if(searchResults.results.length === 0) {
      toast("No results found.")
      setSearchedText(searchResults.searchTerm)
      setTotalResults(searchResults.totalResults)
      setResults(searchResults.results)
    } else {
      setSearchedText(searchResults.searchTerm)
      setTotalResults(searchResults.totalResults)
      setResults(searchResults.results)
    }
  }

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      doSearch()
    }
  }
  
  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    if(params.get("search")) {
      setSearchText(params.get("search"))
    }
    if(params.get("objects")) {
      setSearchObjects(params.get("objects"))
    }
    if(params.get("type")) {
      setSearchType(params.get("type"))
    }
    if(params.get("page")) {
      setPage(parseInt(params.get("page")))
    }
    setParamsLoaded(true)
  }, [])

  useEffect(() => {
    if(page && paramsLoaded) {
      doSearch()
    }
  }, [page, paramsLoaded])

  return (
    <div>
      <div className="mb-4">
        <div className="rounded-t-lg border-t border-x ml-2 text-sm inline-flex items-center p-2">
          <div>
            <input type="radio" name="search-type" checked={searchType === 'semantic'} onChange={() => setSearchType('semantic')} /><span className="ml-2">Semantic Search</span>
          </div>
          <div className="ml-4">
            <input type="radio" name="search-type" checked={searchType === 'text'} onChange={() => setSearchType('text')} /><span className="ml-2">Text-Match Search</span>
          </div>
        </div>
        <div className="rounded-t-lg border-t border-x float-right mr-2 text-sm inline-flex items-center p-2">
          <div>
            <input type="radio" name="search-objects" checked={searchObjects === 'all'} onChange={() => setSearchObjects('all')} /><span className="ml-2">All</span>
          </div>
          <div className="ml-4">
            <input type="radio" name="search-objects" checked={searchObjects === 'books'} onChange={() => setSearchObjects('books')} /><span className="ml-2">Books</span>
          </div>
          <div className="ml-4">
            <input type="radio" name="search-objects" checked={searchObjects === 'letters'} onChange={() => setSearchObjects('letters')} /><span className="ml-2">Letters</span>
          </div>
        </div>
        <form onSubmit={() => doSearch()} onKeyDown={(e) => checkEnterPress(e)}>
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
        </form>
      </div>
    </div>
  )

}
