'use client';

import Commentary from '@/components/letter/commentary';
import Text from '@/components/letter/text';
import Gallery from '@/components/letter/gallery';
import Sources from '@/components/letter/sources';

import { useState, useEffect } from 'react';

export default function LetterContainer({ letter }) {

  const [ currentTab, setCurrentTab ] = useState('text')

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    if(params.get("tab")) {
      setCurrentTab(params.get("tab"))
    }
  }, [])

  useEffect(() => {
    const url = new URL(window.location)
    url.searchParams.set("tab", currentTab)
    window.history.replaceState({}, "", url);
  }, [currentTab])

  return (
    <div>
      <div className="text-md">
        <div className="py-4">
          <h1 className="capitalize text-white text-4xl text-white text-shadow-md text-shadow-black">{letter.title.toLowerCase()}</h1>
          <h5 className="mt-2 text-2xl text-white text-shadow-md text-shadow-black">{letter.reference}. {letter.alt_title}</h5>
          <h4 className="text-left text-xl text-white italic text-shadow-md text-shadow-black">{letter.date_text}, {letter.placename}</h4>
        </div>
        <div className="bg-white rounded-lg shadow-md cardo-regular min-h-[800px]">
          <ul className="flex justify-center text-xl flex-wrap">
            <li>
              <div onClick={() => setCurrentTab('commentary')} className={`${currentTab === 'commentary' ? `text-green-800 border-green-800` : "text-gray-500 border-gray-200 hover:text-gray-600 hover:border-gray-300"} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}>Commentary</div>
            </li>
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
          {currentTab === 'commentary' ? <Commentary letter={letter} /> : false}
          {currentTab === 'text' ? <Text letter={letter} /> : false}
          {currentTab === 'gallery' ? <Gallery letter={letter} /> : false}
          {currentTab === 'sources' ? <Sources letter={letter} /> : false}
        </div>
      </div>
    </div>
  )

}