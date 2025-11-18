'use client';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Search({ setResults, setPage, page, searchedText, setTotalResults, setSearchedText, workOptions }) {

  const [ searchType, setSearchType ] = useState('semantic')
  const [ searchObjects, setSearchObjects ] = useState('all')
  const [ searchText, setSearchText ] = useState("")
  const [ paramsLoaded, setParamsLoaded ] = useState(false);
  const [ selectedWorks, setSelectedWorks ] = useState([])

  const doSearch = async () => {
    let pageToSend = page;
    if(searchedText && searchedText !== searchText) {
      pageToSend = 1;
    }
    if(searchText && searchText !== "") {
      const searchResults = await fetch('/api/search', {
        method : "POST",
        body : JSON.stringify({
          type : searchType,
          objects : searchObjects,
          search : searchText,
          selectedWorks : selectedWorks,
          page : pageToSend
        })
      }).then(resp => resp.json())

      const url = new URL(window.location)
      url.searchParams.set("search", searchText)
      url.searchParams.set("objects", searchObjects)
      url.searchParams.set("type", searchType)
      url.searchParams.set("works", selectedWorks.join(','))
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
    if(params.get("works")) {
      let workArray = params.get("works").split(',')
      setSelectedWorks(workArray.map(workId => parseInt(workId)))
    }
    if(params.get("page")) {
      setPage(parseInt(params.get("page")))
    }
    setParamsLoaded(true)
  }, [])

  useEffect(() => {
    if(page && paramsLoaded) {
      console.log('does search')
      doSearch()
    }
  }, [page, paramsLoaded])

  return (
    <div>
      <form onSubmit={() => doSearch()} onKeyDown={(e) => checkEnterPress(e)}>
        <textarea
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-4 bg-white border border-black text-black w-full rounded-md"
          placeholder="Enter your search here..."
        />
        <div className="cardo-regular">
          <div className="text-sm inline-flex items-center lg:p-2">
            <div className="text-xl -mt-1">1.</div>
            <div className="ml-4">
              <input type="radio" name="search-type" checked={searchType === 'semantic'} onChange={() => setSearchType('semantic')} /><span className="ml-2">Semantic Search</span>
            </div>
            <div className="ml-4">
              <input type="radio" name="search-type" checked={searchType === 'text'} onChange={() => setSearchType('text')} /><span className="ml-2">Text-Match Search</span>
            </div>
          </div>
          <div className="text-sm inline-flex items-center ml-4 lg:ml-0 lg:p-2">
            <div className="text-xl -mt-1">2.</div>
            <div className="ml-4">
              <input type="radio" name="search-objects" checked={searchObjects === 'all'} onChange={() => setSearchObjects('all')} /><span className="ml-2">All</span>
            </div>
            <div className="ml-4">
              <input type="radio" name="search-objects" checked={searchObjects === 'works'} onChange={() => setSearchObjects('works')} /><span className="ml-2">Works</span>
            </div>
            <div className="ml-4">
              <input type="radio" name="search-objects" checked={searchObjects === 'letters'} onChange={() => setSearchObjects('letters')} /><span className="ml-2">Letters</span>
            </div>
          </div>
          <div>
            <details className="mb-2" open={selectedWorks.length > 0}>
              <summary className="mb-1 cursor-pointer hover:underline underline-offset-2 italic">Select specific work(s)</summary>
              <Select
                size={1}
                closeMenuOnSelect={false}
                isMulti
                value={workOptions.filter(option => selectedWorks.indexOf(option.value) > -1)}
                onChange={(e) => setSelectedWorks(e.map(option => option.value))}
                options={workOptions}
              />
            </details>
          </div>
        </div>
        <div
          onClick={() => doSearch()}
          className="mt-2 w-full border text-center rounded-md text-md px-2 py-1 bg-white/30 cursor-pointer hover:bg-white/20">
          Search
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer hover:underline underline-offset-2 italic">How semantic search works</summary>
          <div className="mt-2">
            <p>By default, this search works <em>semantically</em>. This means that you should type in natural language, as to an AI or a chatbot, for what you're looking for. The search system will try to interpret what you are searching for and compare it semantically to an indexed set of passages from Erasmus's works.</p>
            <p className="mt-4">During processing of the text corpus, the texts were broken up into comprehensible sections, which may not have been present in the original text. These chunks were then processed by a LLM AI to create a 2-3 sentence summary, 3-5 themes, and 3-5 keywords. These three elements were then encoded using semantic embedding, creating multiple numeric representations in the database.</p>
            <p className="mt-4">When you enter your query, it is similarly transformed -- first passed through an LLM to contextualize the search, and then encoded using semantic embedding. Finally, this encoding is compared against entries in the database in an attempt to find results that are most semantically similar.</p>
          </div>
        </details>
      </form>
    </div>
  )

}

 