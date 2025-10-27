'use client';

import Commentary from '@/components/work/commentary';
import Text from '@/components/work/text';
import Gallery from '@/components/work/gallery';
import Sources from '@/components/work/sources';

import { useState, useEffect } from 'react';

export default function TextContainer({ work }) {

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
          <h1 className="capitalize text-white text-4xl text-white text-shadow-md text-shadow-black">{work.title.toLowerCase()}</h1>
          <h5 className="mt-2 text-2xl text-white text-shadow-md text-shadow-black">{work.metadata.reference}. {work.alt_title}</h5>
          <h4 className="text-right text-xl text-white italic text-shadow-md text-shadow-black">{work.metadata.date_text}, {work.metadata.placename}</h4>
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
          {currentTab === 'commentary' ? <Commentary work={work} /> : false}
          {currentTab === 'text' ? <Text work={work} /> : false}
          {currentTab === 'gallery' ? <Gallery work={work} /> : false}
          {currentTab === 'sources' ? <Sources work={work} /> : false}
        </div>
      </div>
    </div>
  )

}