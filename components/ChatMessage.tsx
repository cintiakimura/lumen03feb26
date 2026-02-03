
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const GrokAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        G
    </div>
);

const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        U
    </div>
);


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isGrok = message.sender === 'grok';

  return (
    <div className={`flex items-start my-4 ${isGrok ? '' : 'justify-end'}`}>
      {isGrok && <GrokAvatar />}
      <div
        className={`mx-3 px-4 py-3 rounded-2xl max-w-lg ${
          isGrok
            ? 'bg-gray-700 text-gray-200 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-br-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>
       {!isGrok && <UserAvatar />}
    </div>
  );
};
