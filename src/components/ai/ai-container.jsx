'use client';
import { useState } from 'react';

export default function AIContainer({ placeholder, searchTitle }) {

  const [ messages, setMessages ] = useState([{
    type : "bot",
    message : "Greetings! I'm an AI set up to debate with you in an Erasmian style. You can pick from a few preset topics, or ask me anything you like. Please keep your questions and the debate respectful."
  }])
  const [ returningMessage, setReturningMessage ] = useState("");
  const [ input, setInput ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const defaultTopics = [
    "Climate change",
    "Polarization in politics",
    "Women's rights",
    "War in the Middle East"
  ]

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
      console.log('done')
      newMessages.push({ type : "bot", message : streamingText })
      setMessages(newMessages)
      setReturningMessage("");
    }
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="text-black cardo-regular text-xl h-[50vh] w-full border border-black rounded-md flex flex-col">
        <div className="flex-1 bg-gray-200 rounded-t-md overflow-y-auto p-4">
          {messages.map((message, i) => {
            if(message.type === 'user') {
              return (
                <div key={`message-${i}`} className="flex">
                  <div className="text-right ml-auto mb-4 rounded-lg shadow border border-gray-500 bg-gray-100 p-2 inline-block max-w-3/5">
                    {message.message}
                  </div>
                </div>
              )
            } else {
              return (
                <div key={`message-${i}`}>
                  <div 
                    className={`im-fell-dw-pica-regular text-2xl text-left m-auto mb-4 p-2 max-w-4/5`}
                  >
                    {message.message}
                  </div>
                </div>
              )
            }
          })}
          {returningMessage ? 
              <div className={`im-fell-dw-pica-regular text-2xl text-left m-auto mb-4 p-2 max-w-4/5`}>
                {returningMessage}
              </div>
          : false}
          {loading ? "Thinking..." : false}
        </div>
        <div className="flex">
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="w-full mt-auto p-4" placeholder="Start your conversation with Erasmus AI" />
          <button onClick={() => sendMessage()} className="w-64">Send Message</button>
        </div>
      </div>
      <div className="flex gap-2">
        {defaultTopics.map((topic, i) => {
          return (
            <div key={`topic-${i}`} className="bg-blue-950 text-white border border-black shadow mr-2 py-2 px-4 rounded-full ">
              {topic}
            </div>
          )
        })}
      </div>
      <div className="cardo-regular">Please be aware that these topics may be controversial and lead to difficult discussions! While the Erasmus AI tries to avoid being too provocative, it may be steered into uncomfortable territory if you try hard enough. Treat this tool with some grace and awareness.</div>
    </div>
  )

}
