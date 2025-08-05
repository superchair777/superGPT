import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

interface ChatMessageProps {
  message: {
    text: string;
    sender: 'user' | 'bot';
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex items-start gap-4 justify-end my-4">
        <div className={`max-w-xl p-3 rounded-xl ${isDark ? 'bg-[#2f2f2f]' : 'bg-white border border-gray-200'}`}>
          <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 my-8">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
        G
      </div>
      <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`} dangerouslySetInnerHTML={{ __html: message.text }}>
      </div>
    </div>
  );
};

export default ChatMessage;