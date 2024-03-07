'use client'

import { useChat } from 'ai/react';
import { FormEvent } from 'react';
import symptomsKeywords from '@/utils/symptomsKeywords';
 
export default function AI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const isHealthRelated = (input:any) => {
    // Implement your logic to check if the input is health-related
    // You can use regular expressions, keyword matching, or any other method
    // For simplicity, let's assume a keyword "health" in the input means it's health-related
    const lowercasedInput = input.toLowerCase();
    return symptomsKeywords.some(keyword => lowercasedInput.includes(keyword));
  };

  const handleHealthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isHealthRelated(input)) {
      // Only generate AI response if the input is health-related
      handleSubmit(e); // Pass the event to handleSubmit
    } else {
      // Handle non-health-related input (you can display a message, clear the input, etc.)
      console.log("Please ask a health-related question.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

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