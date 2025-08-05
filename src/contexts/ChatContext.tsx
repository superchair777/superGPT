import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContextType {
  messages: Record<string, Message[]>;
  sendMessage: (sessionId: string, message: Message) => void;
  startNewChat: (sessionId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const sendMessage = (sessionId: string, message: Message) => {
    setMessages((prevSessions) => ({
      ...prevSessions,
      [sessionId]: [...(prevSessions[sessionId] || []), message],
    }));
  };

  const startNewChat = (sessionId: string) => {
    setMessages((prevSessions) => ({
      ...prevSessions,
      [sessionId]: [],
    }));
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, startNewChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};