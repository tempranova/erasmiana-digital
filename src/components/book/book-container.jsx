'use client';

import { useState, useEffect } from 'react';

import Text from '@/components/book/text';
import Gallery from '@/components/book/gallery';
import Sources from '@/components/book/sources';

export default function TextContainer({ book, entries }) {

  const [ view, setView ] = useState('sectioned')
  const [ currentTab, setCurrentTab ] = useState('text')

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    if(params.get("view")) {
      setView(params.get("view"))
    }
  }, [])

  useEffect(() => {
    const url = new URL(window.location)
    url.searchParams.set("view", view)
    window.history.replaceState({}, "", url);
  }, [view])

  return (
    <div>
      <div className="text-md">
        <div className="py-4">
          <h1 className="capitalize text-white text-4xl text-white text-shadow-md text-shadow-black">{book.title.toLowerCase()}</h1>
          <h4 className="text-left text-xl text-white italic text-shadow-md text-shadow-black">{book.month} {book.year}, {book.placename}</h4>
        </div>
        <div className="bg-white rounded-lg shadow-md cardo-regular min-h-[800px]">
          <ul className="flex justify-center text-xl flex-wrap">
            <li>
              <div onClick={() => setCurrentTab('text')} className={`${currentTab === 'text' ? `text-green-800 border-green-800` : "text-gray-500 border-gray-200 hover:text-gray-600 hover:border-gray-300"} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}>Text & Translations</div>
            </li>
            <li>
              <div onClick={() => setCurrentTab('gallery')} className={`${currentTab === 'gallery' ? `text-green-800 border-green-800` : "text-gray-500 border-gray-200 hover:text-gray-600 hover:border-gray-300"} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}>Gallery</div>
            </li>
            <li>
              <div onClick={() => setCurrentTab('sources')} className={`${currentTab === 'sources' ? `text-green-800 border-green-800` : "text-gray-500 border-gray-200 hover:text-gray-600 hover:border-gray-300"} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}>Sources</div>
            </li>
          </ul>
          {currentTab === 'text' ? <Text book={book} /> : false}
          {currentTab === 'gallery' ? <Gallery book={book} /> : false}
          {currentTab === 'sources' ? <Sources book={book} /> : false}
        </div>
      </div>
    </div>
  )

}