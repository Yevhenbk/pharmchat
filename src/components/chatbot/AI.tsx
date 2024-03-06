'use client'

import { useState } from 'react';
import { useChat } from 'ai/react';
import { FormEvent, useEffect } from 'react';
import symptomsKeywords from '@/utils/symptomsKeywords';
import { debounce } from 'lodash'

interface AIProps {
  chatId: any,
  chatMessages: messageResponse[],
  createMessage: any
}

interface messageResponse {
    id: number;
    kindeAuthId: string;
    question: string;
    response: string;
    chatId: number;
}
 
export default function AI({chatId, chatMessages, createMessage }: AIProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const isHealthRelated = (input:any) => {
    const lowercasedInput = input.toLowerCase();
    return symptomsKeywords.some(keyword => lowercasedInput.includes(keyword));
  };

  const handleHealthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isHealthRelated(input)) {
      // Only generate AI response if the input is health-related
      handleSubmit(e); // Pass the event to handleSubmit
    } else {
      // Handle non-health-related input (you can display a message, clear the input, etc.)
      console.log("Please ask a health-related question.");
    }
  };

  const userMessage = messages.find(message => message.role === 'user');
  const aiMessage = messages.find(message => message.role === 'assistant');

// Access the content of the user's message
  const userContent = userMessage ? userMessage.content : null;
  const aiContent = aiMessage ? aiMessage.content : null;

  const delayedCreateMessage = debounce(async (chatId, userContent, aiContent) => {
    console.log('aiContent has stopped changing. Sending API message...');
    // await sendMessageToAPI();
    await createMessage(chatId, userContent, aiContent);
  }, 1000)

  useEffect(() => {
    if (isFirstRender) {
      // Skip the effect on the first render
      setIsFirstRender(false);
    } else {
      // Do something on subsequent renders
      console.log("The count has changed to");
      delayedCreateMessage(chatId, userContent, aiContent);
    }
    // const timer = setTimeout(async () => {
    //   console.log('aiContent has stopped changing. Sending API message...');
    //   // await sendMessageToAPI();
    //   await createMessage(chatId, userContent, aiContent)
    // }, 500)

    // return () => clearTimeout(timer);
    

  // Cleanup function to cancel the debounce on component unmount
    return () => delayedCreateMessage.cancel();
  }, [aiContent, messages]);

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {Array.isArray(chatMessages) && chatMessages.map(m => (
        <div key={m.id}>
          {m.question}
          {m.response}
        </div>
      ))}

      <button onClick={() => console.log(messages)}>Send</button> 

      <form onSubmit={handleHealthSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}