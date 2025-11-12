'use client';
import { useState, useRef } from 'react';

export default function AIContainer() {

  const [ messages, setMessages ] = useState([{
    type : "bot",
    message : "Greetings! I'm an AI set up to debate with you in an Erasmian style. You can pick from a few preset topics, or ask me anything you like. Please keep your questions and the debate respectful."
  }])
  const returnMessageRef = useRef();
  const [ returningMessage, setReturningMessage ] = useState("");
  const [ input, setInput ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const sendMessage = async () => {
    const newMessages = [...messages];
    newMessages.push({ type : "user", message : input })
    setInput("")
    setMessages(newMessages);
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
      if(returnMessageRef.current) {
        returnMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setReturningMessage("");
    }
  }

  return (
    <div className="text-black cardo-regular h-[660px] max-h-[700px] w-full flex flex-col">
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
            return (
              <div key={`message-${i}`}>
                <div 
                  className={`im-fell-dw-pica-regular text-xl text-left mb-4 p-2`}
                >
                  “{message.message}”
                </div>
              </div>
            )
          }
        })}
        {returningMessage ? 
            <div ref={returnMessageRef} className={`im-fell-dw-pica-regular text-xl text-left mb-4 p-2`}>
              {returningMessage}
            </div>
        : false}
        {loading ? "Thinking..." : false}
      </div>
      <textarea value={input} onKeyUp={(e) => { if(e.keyCode === 13) { sendMessage() }}} onChange={(e) => setInput(e.target.value)} className="w-full mt-auto px-2.5 py-1 bg-white/90 rounded-md border border-[#3b2d2b]" placeholder="Type your message here..." />
      <button onClick={() => sendMessage()} className="mt-2 w-full border rounded-md text-sm px-2 py-1 bg-white/30 cursor-pointer hover:bg-white/20">Send Message</button>
    </div>
  )

}
