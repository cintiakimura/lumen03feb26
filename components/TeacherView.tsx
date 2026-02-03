
import React, { useState, useEffect, useRef } from 'react';
import { Message, Role } from '../types';
import { getGrokResponse } from '../services/grokService';
import { ChatMessage } from './ChatMessage';

export const TeacherView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialContent.trim()) return;

    setContentSubmitted(true);
    setIsLoading(true);

    const response = await getGrokResponse([], Role.Teacher, initialContent);

    const grokMessage: Message = {
      id: `grok-${Date.now()}`,
      text: response,
      sender: 'grok',
    };
    setMessages([grokMessage]);
    setIsLoading(false);
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: 'user',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const response = await getGrokResponse(newMessages, Role.Teacher);

    const grokMessage: Message = {
      id: `grok-${Date.now()}`,
      text: response,
      sender: 'grok',
    };

    setMessages(prev => [...prev, grokMessage]);
    setIsLoading(false);
  };

  if (!contentSubmitted) {
    return (
        <div className="flex flex-col h-full bg-gray-800">
            <header className="px-6 py-4 border-b border-gray-700">
                <h1 className="text-xl font-semibold text-gray-100">Teacher Mode: Course Builder</h1>
                <p className="text-sm text-gray-400">Paste your raw content and let Grok structure it.</p>
            </header>
            <div className="flex-1 p-6">
                <form onSubmit={handleContentSubmit} className="h-full flex flex-col">
                    <textarea
                        value={initialContent}
                        onChange={(e) => setInitialContent(e.target.value)}
                        placeholder="Paste your raw text here (e.g., from a Coursebox export or manual notes)..."
                        className="w-full h-full flex-1 bg-gray-700 text-gray-200 rounded-lg p-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Structure Content
                    </button>
                </form>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-800">
        <header className="px-6 py-4 border-b border-gray-700">
            <h1 className="text-xl font-semibold text-gray-100">Teacher Mode: Course Builder</h1>
            <p className="text-sm text-gray-400">Refine your module with Grok.</p>
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
                    placeholder="Provide the module topic or ask for tweaks..."
                    className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    Send
                </button>
            </form>
        </div>
    </div>
  );
};
