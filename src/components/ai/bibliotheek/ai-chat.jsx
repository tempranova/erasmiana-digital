'use client';
import { useState, useEffect, useRef } from 'react';
import { marked } from "marked";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function AI() {

  const returnMessageRef = useRef();
  const inputMessageRef = useRef();
  const keyboard = useRef();
  const [ messages, setMessages ] = useState([{
    type : "bot",
    message : "Salutem Plurimam Dicit. Welkom, vriend. Wat zoekt u? Stel uw vraag vrijelijk — geen vraag is te gering voor een open geest."
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
    keyboard.current.clearInput();
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

  const pressButton = (key) => {
    if (key === "{send}") {
      sendMessage(input)
    }
  }

  return (
    <div className="text-black cardo-regular h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-8 messages">
        {messages.map((message, i) => {
          if(message.type === 'user') {
            return (
              <div key={`message-${i}`} className="flex">
                <div className="text-right ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-1/2">
                  {message.message}
                </div>
              </div>
            )
          } else {
            const html = marked.parse(message.message);
            return (
              <div key={`message-${i}`}>
                <div
                  className={`bg-white text-[#27184f] rounded-md shadow-xl mb-4 px-4 py-3 max-w-1/2`}
                >
                  <div className="text-[#00b1ff] font-bold mb-2">Erasmus</div>
                  <span dangerouslySetInnerHTML={{ __html : html }} />
                </div>
              </div>
            )
          }
        })}
        {input !== "" ?
          <div ref={inputMessageRef} className="flex">
            <div className="text-right ml-auto bg-[#00b1ff] text-white rounded-md shadow-xl mb-4 px-4 py-3 inline-block max-w-1/2">
              {input}
            </div>
          </div>
        : false}
        {returningMessage !== "" ?
          <div ref={returnMessageRef} className={`bg-white text-[#27184f] rounded-md shadow-xl mb-4 px-4 py-3 max-w-1/2`}>
            <div className="text-[#00b1ff] font-bold mb-2">Erasmus</div>
            <span dangerouslySetInnerHTML={{ __html : marked.parse(returningMessage) }} />
          </div>
        : false}
        {loading ?
          <div className="bg-white rounded-md shadow-xl mb-4 px-4 py-3 max-w-1/2">
            <div className="italic">Erasmus is typing ...</div>
          </div>
        : false}
      </div>
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layout={{
          'default': [
            '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            'q w e r t y u i o p',
            'a s d f g h j k l ;',
            'z x c v b n m , . ! ?',
            '{space} {send}'
          ],
          'shift': [
            '! @ # $ % ^ & * ( ) _ + {bksp}',
            'Q W E R T Y U I O P',
            'A S D F G H J K L :',
            'Z X C V B N M ! ?',
            '{space} {send}'
          ]
        }}
        display={{
          '{bksp}': "Backspace",
          '{shift}': "Shift",
          '{space}': "Space",
          '{send}': "Bericht verzenden"
        }}
        theme="hg-theme-default"
        onChange={(val) => setInput(val)}
        onKeyPress={(key) => pressButton(key)}
      />
    </div>
  )

}
