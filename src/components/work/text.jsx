'use client';

import React, { useEffect, useState } from 'react';

export default function SingleText({ work }) {

  const [ currentTab, setCurrentTab ] = useState('text')

  return (
    <div>
      <div className="grid grid-cols-2 cardo-regular text-left ">
        <div className="border-1 border-gray-200">
          <div className="p-8 border-b-1 border-gray-200 cardo-regular-italic">
            Latin (Allen)
          </div>
          <div className="p-8 whitespace-pre-line leading-4">
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div>
              </div>
              <div className="cardo-bold mb-4 leading-6">
                {work.title}
              </div>
              {work.entries.map((entry, i) => {
                const lines = entry.text.split("\n");
                return (
                  <React.Fragment key={`entry-${i}`}>
                    {lines.map((line, ii) => {
                      return (
                        <React.Fragment key={`line-${ii}`}>
                          <div>
                            {ii === 0 || ii % 5 === 4 ? ii + 1 : false}
                          </div>
                          <div>
                            {line}
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-1 border-l-0 border-gray-200">
          {work.translations.map((translation, i) => {
            return (
              <div key={`translation-${i}`}>
                <div className="p-8 border-b-1 border-gray-200 cardo-regular-italic capitalize">
                  {translation.language} ({translation.translator})
                </div>
                <div className="p-8 pt-6 whitespace-pre-line leading-8">
                  {translation.text}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

}