import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: string;
  pageType: 'chat' | 'library' | 'floorPlan' | 'threeDRenders' | 'companyCatalogue' | 'clientsList';
}

interface ChatContextType {
  messages: Record<string, Message[]>;
  chatSessions: ChatSession[];
  sendMessage: (sessionId: string, message: Message) => void;
  startNewChat: (sessionId: string) => void;
  generateChatTitle: (messages: Message[]) => string;
  saveChatToHistory: (sessionId: string, pageType: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  const generateChatTitle = (messages: Message[]): string => {
    if (messages.length === 0) return 'New Chat';
    
    const firstUserMessage = messages.find(msg => msg.sender === 'user');
    if (!firstUserMessage) return 'New Chat';
    
    // Extract meaningful title from first user message
    const text = firstUserMessage.text.toLowerCase();
    
    // Common patterns for auto-generating titles
    if (text.includes('logo') || text.includes('brand')) {
      return 'Logo Design Request';
    } else if (text.includes('floor plan') || text.includes('layout') || text.includes('room')) {
      return 'Floor Plan Design';
    } else if (text.includes('3d') || text.includes('render') || text.includes('visualization')) {
      return '3D Visualization';
    } else if (text.includes('furniture') || text.includes('chair') || text.includes('table')) {
      return 'Furniture Discussion';
    } else if (text.includes('client') || text.includes('customer') || text.includes('meeting')) {
      return 'Client Management';
    } else if (text.includes('task') || text.includes('project') || text.includes('work')) {
      return 'Project Planning';
    } else if (text.includes('help') || text.includes('how to') || text.includes('guide')) {
      return 'Help & Support';
    } else {
      // Truncate first message to create title
      const truncated = firstUserMessage.text.substring(0, 30);
      return truncated.length < firstUserMessage.text.length ? `${truncated}...` : truncated;
    }
  };

  const saveChatToHistory = (sessionId: string, pageType: string) => {
    const sessionMessages = messages[sessionId];
    if (!sessionMessages || sessionMessages.length === 0) return;
    
    // Check if chat already exists in history
    const existingChatIndex = chatSessions.findIndex(chat => chat.id === sessionId);
    
    const chatSession: ChatSession = {
      id: sessionId,
      title: generateChatTitle(sessionMessages),
      messages: sessionMessages,
      lastActivity: new Date().toISOString(),
      pageType: pageType as ChatSession['pageType']
    };
    
    setChatSessions(prev => {
      if (existingChatIndex >= 0) {
        // Update existing chat
        const updated = [...prev];
        updated[existingChatIndex] = chatSession;
        return updated;
      } else {
        // Add new chat to beginning of list
        return [chatSession, ...prev];
      }
    });
  };

  const sendMessage = (sessionId: string, message: Message) => {
    const messageWithTimestamp = {
      ...message,
      timestamp: new Date().toISOString()
    };
    
    setMessages((prevSessions) => ({
      ...prevSessions,
      [sessionId]: [...(prevSessions[sessionId] || []), messageWithTimestamp],
    }));
  };

  const startNewChat = (sessionId: string) => {
    setMessages((prevSessions) => ({
      ...prevSessions,
      [sessionId]: [],
    }));
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      chatSessions, 
      sendMessage, 
      startNewChat, 
      generateChatTitle, 
      saveChatToHistory 
    }}>
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