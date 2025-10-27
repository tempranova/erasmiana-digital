'use client';
import { useState } from 'react';

import Link from 'next/link'

export default function LetterIndex({ allLetters }) {

  const groupedArray = Object.values(
    allLetters.reduce((acc, letter) => {
      const volume = letter.metadata?.volume ?? 'unknown'
      if (!acc[volume]) acc[volume] = { volume, letters: [] }
      acc[volume].letters.push(letter)
      return acc
    }, {})
  ).sort((a, b) => {
    const av = a.volume === 'unknown' ? Infinity : parseInt(a.volume, 10) || a.volume
    const bv = b.volume === 'unknown' ? Infinity : parseInt(b.volume, 10) || b.volume
    return av > bv ? 1 : av < bv ? -1 : 0
  })

  return (
    <div className="bg-white w-full rounded-md p-4">
      <h3 className="text-2xl">All Letters</h3>
      <div className="grid grid-cols-2 gap-8">
        {groupedArray.map((letterGroup, i) => {
          return (
            <details key={`letter-group-${i}`} className="mt-4">
              <summary className="text-xl cursor-pointer hover:text-gray-500">Volume {letterGroup.volume} ({letterGroup.letters.length})</summary>
              <div>
                {letterGroup.letters.map((letter, ii) => {
                  return (
                    <div key={`letter-${ii}`} className="pl-4 pb-2 mb-2 border-b border-gray-200">
                      <div className="capitalize">{letter.title.toLowerCase()}</div>
                      <Link href={`/letters/${letter.id}`}>
                        <svg className="cursor-pointer float-right" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.41097 3.57757C9.73641 3.25214 10.2639 3.25214 10.5894 3.57757L16.4227 9.41091C16.4625 9.45075 16.4981 9.49471 16.5293 9.54193C16.5499 9.57317 16.5679 9.60561 16.5838 9.63877C16.602 9.67643 16.6178 9.71541 16.6302 9.75596C16.6354 9.77287 16.6392 9.79009 16.6432 9.80723C16.6579 9.86919 16.6668 9.93364 16.6668 10.0001C16.6668 10.0693 16.6567 10.136 16.6408 10.2003C16.6373 10.2144 16.6344 10.2287 16.6302 10.2426C16.6178 10.2834 16.6021 10.3227 16.5838 10.3606C16.5671 10.3953 16.5478 10.4289 16.526 10.4615C16.5156 10.4772 16.5042 10.4922 16.4927 10.5071C16.471 10.5353 16.4485 10.5635 16.4227 10.5893L10.5894 16.4226C10.2639 16.748 9.73639 16.748 9.41097 16.4226C9.08555 16.0972 9.08559 15.5697 9.41097 15.2442L13.8218 10.8334H4.16683C3.70662 10.8334 3.33353 10.4603 3.3335 10.0001C3.3335 9.53986 3.70659 9.16677 4.16683 9.16677H13.8218L9.41097 4.75596C9.08555 4.43054 9.08559 3.90302 9.41097 3.57757Z" fill="#23282B"/>
                        </svg>
                      </Link>
                      <div className="capitalize text-gray-500">{letter.metadata.reference}. {letter.alt_title.toLowerCase()} ({letter.metadata.placename}, {letter.metadata.date_text})</div>
                    </div>
                  )
                })}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )

}
