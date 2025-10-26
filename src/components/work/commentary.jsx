'use client';

import React, { useEffect, useState } from 'react';

export default function SingleText({ work }) {

  const [ currentCommentary, setCurrentCommentary ] = useState(0)

  console.log(work)

  return (
    <div>
      <div className="grid cardo-regular text-left w-1/2">
        <div className="border-1 border border-gray-200">
          <div className="p-8 border-b-1 border-gray-200 cardo-regular-italic capitalize">
            <div className="flex items-center gap-8">
              {work.commentary.map((commentary, i) => {
                return (
                  <div key={`commentary-${i}`} className={`${i === currentCommentary ? "underline underline-offset-2" : ""} text-black cursor-pointer hover:underline`} onClick={() => setCurrentCommentary(i)}>
                    {commentary.commentator}
                  </div>
                )
              })}
              <div className={`${work.commentary.length === currentCommentary ? "underline underline-offset-2" : ""} text-black cursor-pointer hover:underline`} onClick={() => setCurrentCommentary(work.commentary.length)}>
                AI Summary
              </div>
            </div>
          </div>
          <div className="p-8 pt-6 whitespace-pre-line leading-8">
            {work.commentary[currentCommentary] ? work.commentary[currentCommentary].text : work.summary.text}
          </div>
        </div>
      </div>
    </div>
  )

}