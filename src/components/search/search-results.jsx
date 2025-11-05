'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link'

import { formatDate } from '@/lib/utils/dates'

export default function SearchResults({ results, searchedText }) {

  const highlightSnippet = (result) => {
    if(result.snippet && searchedText) {
      if (!searchedText) return `<span>${result.snippet}</span>`;
      const escaped = searchedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
      const regex = new RegExp(`(${escaped})`, "gi");
      const highlighted = result.snippet.replace(regex, `<span class="font-bold underline">$1</span>`);
      return `<span>${highlighted}</span>`;
    }
  }

  return (
    <div className="rounded-md bg-white">
      {results.map((result, i) => {
        return (
          <div key={`result-${i}`} className="border-b-4 border-gray-100 p-4 relative">
            {result.letter ? 
              <div>
                <div className="float-right text-right im-fell-dw-pica-regular-italic text-gray-600">{result.letter.place_text}, {result.letter.date_text}</div>
                <Link href={`/letters/${result.letter.id}`} className="hover:opacity-50">
                  <div className="capitalize text-2xl im-fell-dw-pica-regular">{result.letter.title.toLowerCase()}</div>
                  <div className="capitalize text-xl im-fell-dw-pica-regular text-gray-600">Letter {result.letter.reference}. {result.letter.alt_title.toLowerCase()}</div>
                </Link>
                {result.summary ? <div className="mt-4 text-sm cardo-regular">{result.summary}</div> : false}
                {result.snippet ? <div className="mt-4 text-sm cardo-regular">... <span dangerouslySetInnerHTML={{ __html : highlightSnippet(result) }} /> ...</div> : false}
              </div>
            : false }
            {result.section ?
              <div>
                <div className="float-right im-fell-dw-pica-regular-italic text-gray-600">{result.section.book.placename}, {formatDate(result.section.book.day, result.section.book.month, result.section.book.year)}</div>
                <Link href={`/books/${result.section.book.id}`} className="hover:opacity-50">
                  <div className="capitalize text-2xl im-fell-dw-pica-regular">{result.section.book.title.toLowerCase()}</div>
                  <div className="capitalize text-xl im-fell-dw-pica-regular text-gray-600">{result.section.book.alt_title.toLowerCase()}</div>
                </Link>
                {result.summary ? <div className="mt-4 text-sm cardo-regular">Section {result.section.title} : {result.summary}</div> : false}
                {result.snippet ? <div className="mt-4 text-sm cardo-regular">... <span dangerouslySetInnerHTML={{ __html : highlightSnippet(result) }} /> ...</div> : false}
              </div>
            : false}
          </div>
        )
      })}
    </div>
  )

}
