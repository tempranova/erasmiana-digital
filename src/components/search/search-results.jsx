'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link'

export default function SearchResults({ results }) {

  return (
    <div className="grid grid-cols-3 gap-8">
      {results.map((result, i) => {
        return (
          <div key={`result-${i}`} className="bg-white rounded-md p-4 relative pb-18">
            {result.letter ? 
              <div>
                <div className="capitalize text-2xl im-fell-dw-pica-regular">{result.letter.title.toLowerCase()}</div>
                <div className="capitalize text-xl im-fell-dw-pica-regular text-gray-600">Letter {result.letter.reference}. {result.letter.alt_title.toLowerCase()}</div>
                <div className="text-right im-fell-dw-pica-regular-italic text-gray-600">{result.letter.placename}, {result.letter.date_text}</div>
                <div className="mt-4 text-sm cardo-regular">{result.summary}</div>
                <Link href={`/letters/${result.letter.id}`}>
                  <div className="bottom-0 right-0 m-4 border border-green-950 px-4 py-2 rounded-md absolute text-green-950 text-right cardo-regular text-xl flex items-center cursor-pointer hover:bg-gray-200">
                    See Letter
                    <svg className="ml-2.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41097 3.57757C9.73641 3.25214 10.2639 3.25214 10.5894 3.57757L16.4227 9.41091C16.4625 9.45075 16.4981 9.49471 16.5293 9.54193C16.5499 9.57317 16.5679 9.60561 16.5838 9.63877C16.602 9.67643 16.6178 9.71541 16.6302 9.75596C16.6354 9.77287 16.6392 9.79009 16.6432 9.80723C16.6579 9.86919 16.6668 9.93364 16.6668 10.0001C16.6668 10.0693 16.6567 10.136 16.6408 10.2003C16.6373 10.2144 16.6344 10.2287 16.6302 10.2426C16.6178 10.2834 16.6021 10.3227 16.5838 10.3606C16.5671 10.3953 16.5478 10.4289 16.526 10.4615C16.5156 10.4772 16.5042 10.4922 16.4927 10.5071C16.471 10.5353 16.4485 10.5635 16.4227 10.5893L10.5894 16.4226C10.2639 16.748 9.73639 16.748 9.41097 16.4226C9.08555 16.0972 9.08559 15.5697 9.41097 15.2442L13.8218 10.8334H4.16683C3.70662 10.8334 3.33353 10.4603 3.3335 10.0001C3.3335 9.53986 3.70659 9.16677 4.16683 9.16677H13.8218L9.41097 4.75596C9.08555 4.43054 9.08559 3.90302 9.41097 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
              </div>
            : 
              <div>
                <div className="capitalize text-2xl im-fell-dw-pica-regular">{result.section.book.title.toLowerCase()}</div>
                <div className="capitalize text-xl im-fell-dw-pica-regular text-gray-600">{result.section.book.alt_title.toLowerCase()}</div>
                <div className="text-right im-fell-dw-pica-regular-italic text-gray-600">{result.section.book.placename}, {result.section.book.month} {result.section.book.year}</div>
                <div className="">Section {result.section.title}</div>
                <div className="mt-4 text-sm cardo-regular">{result.summary}</div>
                <Link href={`/books/${result.section.book.id}`}>
                  <div className="bottom-0 right-0 m-4 border border-green-950 px-4 py-2 rounded-md absolute text-green-950 text-right cardo-regular text-xl flex items-center cursor-pointer hover:bg-gray-200">
                    See Book
                    <svg className="ml-2.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41097 3.57757C9.73641 3.25214 10.2639 3.25214 10.5894 3.57757L16.4227 9.41091C16.4625 9.45075 16.4981 9.49471 16.5293 9.54193C16.5499 9.57317 16.5679 9.60561 16.5838 9.63877C16.602 9.67643 16.6178 9.71541 16.6302 9.75596C16.6354 9.77287 16.6392 9.79009 16.6432 9.80723C16.6579 9.86919 16.6668 9.93364 16.6668 10.0001C16.6668 10.0693 16.6567 10.136 16.6408 10.2003C16.6373 10.2144 16.6344 10.2287 16.6302 10.2426C16.6178 10.2834 16.6021 10.3227 16.5838 10.3606C16.5671 10.3953 16.5478 10.4289 16.526 10.4615C16.5156 10.4772 16.5042 10.4922 16.4927 10.5071C16.471 10.5353 16.4485 10.5635 16.4227 10.5893L10.5894 16.4226C10.2639 16.748 9.73639 16.748 9.41097 16.4226C9.08555 16.0972 9.08559 15.5697 9.41097 15.2442L13.8218 10.8334H4.16683C3.70662 10.8334 3.33353 10.4603 3.3335 10.0001C3.3335 9.53986 3.70659 9.16677 4.16683 9.16677H13.8218L9.41097 4.75596C9.08555 4.43054 9.08559 3.90302 9.41097 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
              </div>
            }
          </div>
        )
      })}
    </div>
  )

}
