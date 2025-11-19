'use client';
import { useState, useEffect, useRef } from 'react';
import { marked } from "marked";

export default function AI({ sendForSources, clickedMessage }) {
  
  const returnMessageRef = useRef();
  const [ messages, setMessages ] = useState([{
    type : "bot",
    message : "Greetings! I'm *Erasmus AI*, meant to help you sharpen your critical thinking using methods of debate Erasmus might have used. Ask me anything or choose from some suggested topics."
  }])
  const [ returningMessage, setReturningMessage ] = useState("");
  const [ input, setInput ] = useState("")
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if(clickedMessage) {
      sendMessage(clickedMessage)
    }
  }, [clickedMessage])

  const sendMessage = async (thisInput) => {
    const newMessages = [...messages];
    newMessages.push({ type : "user", message : thisInput })
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    const response = await fetch(`/api/ai`, {
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
      sendForSources(newMessages);
      if(returnMessageRef.current) {
        returnMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setReturningMessage("");
    }
  }

  return (
    <div className="text-black cardo-regular min-h-[400px] lg:h-[630px] w-full flex flex-col">
      <div className="flex-1 rounded-t-md overflow-y-auto">
        {messages.map((message, i) => {
          if(message.type === 'user') {
            return (
              <div key={`message-${i}`} className="flex">
                <div className="text-right ml-auto mb-4 rounded-lg shadow border border-gray-500 bg-gray-100/50 p-2 inline-block">
                  {message.message}
                </div>
              </div>
            )
          } else {
            const html = marked.parse("“" + message.message + "”");
            return (
              <div key={`message-${i}`}>
                <div 
                  className={`im-fell-dw-pica-regular text-xl text-left mb-4 p-2`}
                >
                  <span dangerouslySetInnerHTML={{ __html : html }} />
                </div>
              </div>
            )
          }
        })}
        {returningMessage ? 
            <div ref={returnMessageRef} className={`im-fell-dw-pica-regular text-xl text-left mb-4 p-2`}>
              <span dangerouslySetInnerHTML={{ __html : marked.parse("“" + returningMessage + "”") }} />
            </div>
        : false}
        {loading ? "Thinking..." : false}
      </div>
      <textarea value={input} onKeyUp={(e) => { if(e.keyCode === 13) { sendMessage(input) }}} onChange={(e) => setInput(e.target.value)} className="w-full mt-auto px-2.5 py-1 bg-white/90 rounded-md border border-[#3b2d2b]" placeholder="Type your message here..." />
      <button onClick={() => sendMessage(input)} className="mt-2 w-full border rounded-md text-sm px-2 py-1 bg-white/30 cursor-pointer hover:bg-white/20">Send Message</button>
    </div>
  )

}