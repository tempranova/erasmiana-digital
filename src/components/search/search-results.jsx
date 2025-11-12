'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link'

import { formatDate } from '@/lib/utils/dates'

export default function SearchResults({ results, searchedText, showKeywords, showThemes }) {

  const highlightSnippet = (result) => {
    if(result.snippet && searchedText) {
      if (!searchedText) return `<span>${result.snippet}</span>`;
      const escaped = searchedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
      const regex = new RegExp(`(${escaped})`, "gi");
      const highlighted = result.snippet.replace(regex, `<span class="font-bold underline">$1</span>`);
      return `<span>${highlighted}</span>`;
    }
  }

  console.log(results)

  return (
    <div>
      {results.map((result, i) => {
        return (
          <div key={`result-${i}`} className={`pb-4 mb-4 border-b-1 border-[#3b2d2b] relative cardo-regular`}>
            {result.letter ? 
              <div>
                <div className="float-right text-sm text-right text-gray-600">{result.letter.place_text}, {result.letter.date_text}</div>
                <Link href={`/letters/${result.letter.id}`} className="hover:opacity-50">
                  <div className="capitalize text-xl">{result.letter.title.toLowerCase()}</div>
                  <div className="capitalize text-md text-gray-600">Letter {result.letter.reference}. {result.letter.alt_title.toLowerCase()}</div>
                </Link>
                {result.metadata?.summary ? <div className="mt-4 text-sm cardo-regular">{result.metadata.summary}</div> : false}
                {result.snippet ? <div className="mt-4 text-sm cardo-regular">... <span dangerouslySetInnerHTML={{ __html : highlightSnippet(result) }} /> ...</div> : false}
              </div>
            : false }
            {result.section ?
              <div>
                <Link href={`/works/${result.section.work.id}/sections/${result.section.id}`} className="hover:opacity-50">
                  <div className="capitalize text-xl">{result.section.work.title.toLowerCase()}</div>
                  {result.section.work.alt_title ? <div className="capitalize text-md text-gray-600">{result.section.work.alt_title.toLowerCase()}</div> : false }
                </Link>
                {result.metadata?.summary ? <div className="mt-4 text-sm cardo-regular"><span className="italic">Page{result.section.pages.length > 1 ? 's' : ''} {result.section.pages.join(', ')}:</span> {result.metadata.summary}</div> : false}
                {result.snippet ? <div className="mt-4 text-sm cardo-regular">... <span dangerouslySetInnerHTML={{ __html : highlightSnippet(result) }} /> ...</div> : false}
              </div>
            : false}
            {showThemes ? 
              <div className="mt-2 flex gap-2 text-xs">
                {result.metadata.themes.map((theme, i) => {
                  return (
                    <div key={`theme-${i}`} className="border border-[#3b2d2b] px-2 py-1 rounded-md opacity-50">
                      {theme}
                    </div>
                  )
                })}
              </div>
            : false}
            {showKeywords ? 
              <div className="mt-2 flex gap-2 text-xs">
                {result.metadata.keywords.map((keyword, i) => {
                  return (
                    <div key={`keyword-${i}`} className="border border-[#3b2d2b] px-1 py-0.5 rounded-md opacity-50">
                      {keyword}
                    </div>
                  )
                })}
              </div>
            : false}
          </div>
        )
      })}
    </div>
  )

}
