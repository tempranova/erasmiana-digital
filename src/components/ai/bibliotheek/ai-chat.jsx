'use client';
import { useState, useEffect, useRef } from 'react';
import { marked } from "marked";
import Keyboard from '@/components/ai/bibliotheek/keyboard';

export default function AI({ dict }) {

  const returnMessageRef = useRef();
  const inputMessageRef = useRef();
  const [ messages, setMessages ] = useState([{
    type : "bot",
    message : dict.welcome
  }])
  const [ returningMessage, setReturningMessage ] = useState("");
  const [ input, setInput ] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(inputMessageRef.current) {
      inputMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [input]);

  const sendMessage = async (thisInput) => {
    const newMessages = [...messages];
    newMessages.push({ type : "user", message : thisInput })
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    const response = await fetch(`/api/ai/bibliotheek`, {
      method : "POST",
      body : JSON.stringify({
        messages : newMessages
      })
    })
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let streamingText = '';
    setLoading(false)

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              let text = line.slice(3, line.length - 1);
              text = text.replace(/\\n/g, "\n");
              streamingText += text;

              if(returnMessageRef.current) {
                returnMessageRef.current.scrollIntoView({ behavior: "smooth" });
              }
              setReturningMessage(streamingText);
            } catch (e) {
              // Sometimes the data might not be JSON
              console.log(e)
              console.log('Raw data:', line.slice(6));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading stream:', error);
    } finally {
      newMessages.push({ type : "bot", message : streamingText })
      setMessages(newMessages)
      if(returnMessageRef.current) {
        returnMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setReturningMessage("");
    }
  }

  return (
    <div className="text-black cardo-regular h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-8 messages">
        <div className="w-1/2 m-auto">
          {messages.map((message, i) => {
            if(message.type === 'user') {
              return (
                <div key={`message-${i}`} className="flex">
                  <div className="text-right ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-6/7">
                    {message.message}
                  </div>
                </div>
              )
            } else {
              const html = marked.parse(message.message);
              return (
                <div key={`message-${i}`}>
                  <div
                    className={`bg-white text-[#27184f] rounded-md shadow-xl mb-4 px-4 py-3 max-w-6/7`}
                  >
                    <div className="text-[#00b1ff] font-bold mb-2">Erasmus</div>
                    <span dangerouslySetInnerHTML={{ __html : html }} />
                  </div>
                </div>
              )
            }
          })}
          {input === "" && messages.length === 1 ?
            <div className="flex">
              <div className="text-right italic ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-6/7">
                {dict.followup}
              </div>
            </div>
          : false}
          {input === "" && messages.length > 1 ?
            <div className="flex">
              <div className="text-right italic ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-6/7">
                {dict.type}...
              </div>
            </div>
          : false}
          {input !== "" ?
            <div ref={inputMessageRef} className="flex">
              <div className="text-right ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-6/7">
                {input}
              </div>
            </div>
          : false}
          {returningMessage !== "" ?
            <div ref={returnMessageRef} className={`bg-white text-[#27184f] rounded-md shadow-xl mb-4 px-4 py-3 max-w-6/7`}>
              <div className="text-[#00b1ff] font-bold mb-2">Erasmus</div>
              <span dangerouslySetInnerHTML={{ __html : marked.parse(returningMessage) }} />
            </div>
          : false}
          {loading ?
            <div className="bg-white rounded-md shadow-xl mb-4 px-4 py-3 max-w-6/7">
              <div className="italic">{dict.typing} ...</div>
            </div>
            : false}
        </div>
      </div>
      <Keyboard dict={dict} value={input} onChange={setInput} send={() => sendMessage(input)} />
    </div>
  )

}
