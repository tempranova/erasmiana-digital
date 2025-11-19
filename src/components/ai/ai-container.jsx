'use client';
import { useState, useRef } from 'react';
import Link from 'next/link'

import AIChat from '@/components/ai/ai-chat';
import { systemPrompt } from '@/lib/utils/ai';

export default function AIContainer() {

  const [clickedMessage, setClickedMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(false)
  const [suggestedSources, setSuggestedSources] = useState([])

  const suggestedTopics = [
    "The nature of intelligence",
    "Favorite ice cream",
    "Climate change",
    "Belief in God",
    "War and violence"
  ]

  const sendForSources = async (latestMessages) => {
    const messagesToSend = latestMessages
      .filter(m => m.type === 'user')
      .slice(-2); 
    setLoading(true)
    const response = await fetch(`/api/ai/sources`, {
      method : "POST",
      body : JSON.stringify({
        messages : messagesToSend
      })
    }).then(resp => resp.json())
    setLoading(false)
    setSearchTerm(response.searchTerm)
    setSuggestedSources(response.results)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 text-left">
      <div className="p-8">
        <div className="lg:hidden text-center">
          <div className="my-4 cardo-regular text-2xl text-[#3b2d2b] leading-none break-all">Debate AI</div>
        </div>
        <AIChat sendForSources={sendForSources} clickedMessage={clickedMessage} />
      </div>
      <div id="scroll-container" className="p-4 mt-4 mb-4 pl-8 lg:max-h-[700px] overflow-y-scroll cardo-regular">
        <h2 className="text-xl font-semibold">A Few Possible Topics</h2>
        <div className="mt-2 flex flex-wrap gap-2 items-center text-sm">
          {suggestedTopics.map((topic, i) => {
            return (
              <div key={`topic-${i}`} onClick={() => setClickedMessage(topic)} className="rounded-full px-2 py-1 border border-[#3b2d2b] bg-white/40 cursor-pointer hover:bg-white/20">{topic}</div>
            )
          })}
        </div>
        <h2 className="mt-4 text-xl font-semibold">Associated Sources</h2>
        <div className="mt-2">
          {suggestedSources.length === 0 && !loading ? 
            <p className="mt-2">As you start chatting, the ErasmusAI bot will try to find some passages by Erasmus that might relate in some way to your conversation. Check them out for more about what Erasmus himself might have thought!</p>
          : false}
          {loading ? 
            <div className="flex items-center ">
              <svg className="ml-2" width="20" height="20" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#333">
                <rect y="10" width="15" height="120" rx="6">
                    <animate attributeName="height"
                        begin="0.5s" dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                        repeatCount="indefinite" />
                    <animate attributeName="y"
                        begin="0.5s" dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                        repeatCount="indefinite" />
                </rect>
                <rect x="30" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height"
                        begin="0.25s" dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                        repeatCount="indefinite" />
                    <animate attributeName="y"
                        begin="0.25s" dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                        repeatCount="indefinite" />
                </rect>
                <rect x="60" width="15" height="140" rx="6">
                    <animate attributeName="height"
                        begin="0s" dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                        repeatCount="indefinite" />
                    <animate attributeName="y"
                        begin="0s" dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                        repeatCount="indefinite" />
                </rect>
                <rect x="90" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height"
                        begin="0.25s" dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                        repeatCount="indefinite" />
                    <animate attributeName="y"
                        begin="0.25s" dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                        repeatCount="indefinite" />
                </rect>
                <rect x="120" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height"
                        begin="0.5s" dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                        repeatCount="indefinite" />
                    <animate attributeName="y"
                        begin="0.5s" dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                        repeatCount="indefinite" />
                </rect>
            </svg>
            <div className="ml-2 italic text-sm mb-2">Erasmus AI is searching for related sources...</div>
            </div>
          : false}
          {searchTerm ? 
            <div>
              <div className="italic mb-2">“{searchTerm}”</div>
              {suggestedSources.map((result, i) => {
                return (
                  <div key={`result-${i}`} className={`pb-4 mb-4 border-b-1 border-[#3b2d2b] relative cardo-regular`}>
                    {result.letter ? 
                      <div>
                        <div className="float-right text-sm text-right text-gray-600">{result.letter.place_text}, {result.letter.date_text}</div>
                        <Link target="_blank" href={`/letters/${result.letter.id}`} className="hover:opacity-50">
                          <div className="capitalize text-xl">{result.letter.title.toLowerCase()}</div>
                          <div className="capitalize text-md text-gray-600">Letter {result.letter.reference}. {result.letter.alt_title.toLowerCase()}</div>
                        </Link>
                        {result.metadata?.summary ? <div className="mt-4 text-sm cardo-regular">{result.metadata.summary}</div> : false}
                      </div>
                    : false }
                    {result.section ?
                      <div>
                        <Link target="_blank" href={`/works/${result.section.work.id}/sections/${result.section.id}`} className="hover:opacity-50">
                          <div className="capitalize text-xl">{result.section.work.title.toLowerCase()}</div>
                          {result.section.work.alt_title ? <div className="capitalize text-md text-gray-600">{result.section.work.alt_title.toLowerCase()}</div> : false }
                        </Link>
                        {result.metadata?.summary ? 
                          <div className="mt-4 text-sm cardo-regular">
                            {result.section.title ? <span className="italic mr-1">{result.section.title}:</span> : false}
                            {result.section.pages.length > 0 ? <span className="italic mr-1">Page{result.section.pages.length > 1 ? 's' : ''} {result.section.pages.join(', ')}:</span> : false}
                            {result.metadata.summary}
                          </div> 
                        : false}
                      </div>
                    : false}
                  </div>
                )
              })}
            </div>
          : false}
        </div>
        <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
        <details className="mt-2 pb-8">
          <summary className="cursor-pointer hover:underline underline-offset-2 italic">How ErasmusAI Works</summary>
          <div className="mt-2">
            <p>This "ErasmusAI" is an experiment in creating a tool to help chatters think more critically about their opinions. Just what might be considered an "Erasmian method" isn't entirely defined, but here is the system prompt:</p>
            <div className="code text-[10px] whitespace-pre-line">
              {systemPrompt}
            </div>
          </div>
        </details>
      </div>
    </div>
  )

}
