'use client';
import Commentary from '@/components/work/commentary';
import Text from '@/components/work/text';
import Gallery from '@/components/work/gallery';
import Sources from '@/components/work/sources';

import { useState, useEffect } from 'react';

export default function TextContainer({ book, entries }) {

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
          <h1 className="capitalize text-white text-4xl text-white text-shadow-md text-shadow-black">{book.title.toLowerCase()}</h1>
          <h5 className="mt-2 text-2xl text-white text-shadow-md text-shadow-black">{book.alt_title}</h5>
        </div>
        <div className="bg-white rounded-lg shadow-md cardo-regular min-h-[800px] p-8">
          <div className="max-h-screen h-screen w-3/4 overflow-y-auto pr-8">
            {book.sections.map((section, i) => {
              return (
                <div key={`section-${i}`} className="">
                  <p className="mb-4 text-justify">{section.title}</p>
                  <p className="mb-4 text-justify">{section.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

}