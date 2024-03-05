'use client'

import { useState } from 'react';
import prisma from '@/lib/db';
import { useChat } from 'ai/react';
import { FormEvent, useEffect } from 'react';
import symptomsKeywords from '@/utils/symptomsKeywords';

interface AIProps {
  chatId: any,
  chatMessages: messageResponse[]
}

interface messageResponse {
    id: number;
    kindeAuthId: string;
    question: string;
    response: string;
    chatId: number;
}
 
export default function AI({chatId, chatMessages }: AIProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const isHealthRelated = (input:any) => {
    // Implement your logic to check if the input is health-related
    // You can use regular expressions, keyword matching, or any other method
    // For simplicity, let's assume a keyword "health" in the input means it's health-related
    const lowercasedInput = input.toLowerCase();
    return symptomsKeywords.some(keyword => lowercasedInput.includes(keyword));
  };

  const handleHealthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isHealthRelated(input)) {
      // Only generate AI response if the input is health-related
      await handleSubmit(e); // Pass the event to handleSubmit
    } else {
      // Handle non-health-related input (you can display a message, clear the input, etc.)
      console.log("Please ask a health-related question.");
    }
  };

  const sendMessageToAPI = async () => {
    const userMessage = messages.find(message => message.role === 'user');
    const aiMessage = messages.find(message => message.role === 'assistant');

// Access the content of the user's message
    const userContent = userMessage ? userMessage.content : null;
    const aiContent = aiMessage ? aiMessage.content : null;
    // console.log("userContent", userContent)
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userContent, aiContent, chatId: chatId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send messages");
      }

      console.log(messages, chatId)

      const result = await response.json();
      console.log("Messages sent successfully:", result);
      // Do something with the result if needed
    } catch (error) {
      console.error("Error sending messages:", error);
      // Handle errors
    }
  };

  // useEffect to automatically send messages to the API when the component mounts
  // useEffect(() => {
  //   sendMessageToAPI();
  // }, [messages]);

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {chatMessages && chatMessages.map(m => (
        <div key={m.id}>
          {m.question}
          {m.response}
        </div>
      ))}

        <button onClick={() => {
          sendMessageToAPI()
          console.log(chatMessages)
          }}>Messages</button>

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