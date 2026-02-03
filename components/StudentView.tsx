
import React, { useState, useEffect, useRef } from 'react';
import { Message, Role } from '../types';
import { getGrokResponse } from '../services/grokService';
import { ChatMessage } from './ChatMessage';

const initialTheory = `Alright, let's dive into Advanced Automotive Fault Diagnosis. Don't let the 'advanced' part scare you off - it's all about logic.

Think of it like being a detective for cars. You have two main tools: your knowledge of how a car *should* work, and a logical routine to find out why it *isn't*.

We need to be clear on a few terms:
- **Symptom:** This is what the driver notices. "The car is making a funny noise."
- **Fault:** This is the actual error in the system. "The water pump bearing has failed."
- **Root Cause:** This is *why* the fault happened. "The bearing failed due to a coolant leak."

We'll use a simple six-stage process for almost everything:
1.  **Verify:** Is there really a problem?
2.  **Collect:** Get more info. Ask the driver questions.
3.  **Evaluate:** Stop and think. What could it be?
4.  **Test:** Carry out logical tests to confirm or deny your theories.
5.  **Rectify:** Fix the problem.
6.  **Check:** Make sure it's actually fixed and you didn't create a new problem!

Ready to talk about what this looks like in a real-world situation?`;

export const StudentView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
      { id: 'initial-grok', text: initialTheory, sender: 'grok' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const response = await getGrokResponse([...messages, userMessage], Role.Student);

    const grokMessage: Message = {
      id: `grok-${Date.now()}`,
      text: response,
      sender: 'grok',
    };

    setMessages(prev => [...prev, grokMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
        <header className="px-6 py-4 border-b border-gray-700">
            <h1 className="text-xl font-semibold text-gray-100">Student Mode: Automotive Diagnosis</h1>
            <p className="text-sm text-gray-400">Your conversational tutor, Grok</p>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
            {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
                <div className="flex items-start my-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">G</div>
                    <div className="mx-3 px-4 py-3 rounded-2xl max-w-lg bg-gray-700 text-gray-200 rounded-tl-none flex items-center">
                        <span className="text-sm text-gray-400 animate-pulse">Grok is thinking...</span>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
        <div className="p-6 bg-gray-900 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a question or describe what you know..."
                    className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={isLoading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Send
                </button>
            </form>
        </div>
    </div>
  );
};
