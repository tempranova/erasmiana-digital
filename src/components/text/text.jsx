'use client';

import React, { useEffect, useState } from 'react';

export default function SingleText({ textInfo }) {

  const [ currentTab, setCurrentTab ] = useState('text')

  const lines = textInfo.text_latin.split("\n");

  return (
    <div>
      <div className="text-md">
        <div className="py-4 flex flex-col items-center">
          <h1 className="capitalize text-black text-2xl cardo-regular text-shadow-sm text-shadow-white">{textInfo.letter_number}. {textInfo.title.toLowerCase()}</h1>
          <h5 className="mt-4 text-xl cardo-bold text-shadow-sm text-shadow-white">{textInfo.letter_title_latin}</h5>
          <h4 className="mt-4 mb-8 text-md cardo-regular text-shadow-sm text-shadow-white">{textInfo.date}, {textInfo.place}</h4>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="flex justify-center text-sm flex-wrap">
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
          {currentTab === 'text' ? 
            <div>
              <div className="mt-4 grid grid-cols-2 cardo-regular text-left ">
                <div className="border-1 border-gray-200">
                  <div className="p-8 border-b-1 border-gray-200 cardo-regular-italic">
                    Allen (Latin)
                  </div>
                  <div className="p-8 whitespace-pre-line leading-4">
                    <div className="grid grid-cols-[auto_1fr] gap-4">
                      <div>
                      </div>
                      <div className="cardo-bold mb-4 leading-6">
                        {textInfo.letter_title_latin}
                      </div>
                      {lines.map((line, index) => {
                        return (
                          <React.Fragment key={`line-${index}`}>
                            <div>
                              {index === 0 || index%5 === 4 ? index + 1 : false}
                            </div>
                            <div>
                              {line}
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-1 border-l-0 border-gray-200">
                  <div className="p-8 border-b-1 border-gray-200 cardo-regular-italic">
                    English (AI)
                  </div>
                  <div className="p-8 pt-6 whitespace-pre-line leading-8">
                    {textInfo.translation_eng}
                  </div>
                </div>
              </div>
            </div>
          : false}
          {currentTab === 'gallery' ?
            <div>
              <div className="p-8 grid grid-cols-2 gap-4">
                {textInfo.pages.map((page, index) => {
                  return (
                    <>
                      <div>
                        <img className="w-full" src={`assets/images/${textInfo.volume}-page-${page}.png`} />
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          : false} 
        </div>
      </div>
    </div>
  )

}