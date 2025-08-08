import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import { geminiService } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Header from './Header';
import {
  Image,
  FileText,
  PenTool,
  MoreHorizontal,
  Code,
  Lightbulb,
  Eye,
  GraduationCap,
  ClipboardList,
} from 'lucide-react';

interface ChatAreaProps {
  sidebarOpen: boolean;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatArea: React.FC<ChatAreaProps> = ({ sidebarOpen }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage, saveChatToHistory } = useChat();
  const sessionId = 'main';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allActions = [
    { icon: Image, label: t('actions.createImage'), color: 'text-green-400' },
    { icon: PenTool, label: t('actions.helpWrite'), color: 'text-purple-400' },
    { icon: FileText, label: t('actions.summarizeText'), color: 'text-orange-400' },
    { icon: Eye, label: t('actions.analyzeImages'), color: 'text-blue-400' },
    { icon: GraduationCap, label: t('actions.getAdvice'), color: 'text-cyan-400' },
    { icon: Code, label: t('actions.code'), color: 'text-indigo-400' },
    { icon: ClipboardList, label: t('actions.makePlan'), color: 'text-yellow-400' },
    { icon: Lightbulb, label: t('more.brainstorm'), color: 'text-pink-400' },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const newMessage: Message = { text: message, sender: 'user' };
      sendMessage(sessionId, newMessage);
      setMessage('');
      setIsLoading(true);

      try {
        // Get AI response using Gemini
        const aiResponse = await geminiService.generateChatResponse(newMessage.text, messages);
        
        const botMessage: Message = {
          text: aiResponse,
          sender: 'bot',
        };
        sendMessage(sessionId, botMessage);
        
        // Auto-save chat to history after bot responds
        setTimeout(() => {
          saveChatToHistory(sessionId, 'chat');
        }, 500);
      } catch (error) {
        console.error('Error getting AI response:', error);
        const errorMessage: Message = {
          text: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
          sender: 'bot',
        };
        sendMessage(sessionId, errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMoreClick = () => {
    setShowMoreDropdown(!showMoreDropdown);
  };

  const handleOptionClick = (option: string) => {
    console.log('Selected option:', option);
    setShowMoreDropdown(false);
  };
  return (
    <div className={`flex-1 flex flex-col h-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0">
        {/* Messages Area */}
        <div className="flex-1 min-h-0">
          {messages.length > 0 ? (
            <div className="h-full overflow-y-auto p-6">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <h1 className={`text-3xl md:text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('chat.welcomeMessage')}
                </h1>
              </div>
              {/* Quick Actions */}
              <div className="flex flex-col items-center gap-3 mt-6">
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 transition-all duration-300 ease-in-out w-full ${showMoreDropdown ? 'max-h-[1000px]' : 'max-h-[5rem]'} overflow-hidden`}>
                  {allActions.slice(0, showMoreDropdown ? allActions.length : 5).map((action, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
                        isDark
                          ? 'bg-[#2f2f2f] hover:bg-[#3f3f3f] text-gray-300 hover:text-white border-gray-600 hover:border-gray-500'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <action.icon size={16} className={action.color} />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
                {!showMoreDropdown && (
                  <button
                    onClick={handleMoreClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
                      isDark
                        ? 'bg-[#2f2f2f] hover:bg-[#3f3f3f] text-gray-300 hover:text-white border-gray-600 hover:border-gray-500'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <MoreHorizontal size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className="text-sm">{t('actions.more')}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Section - Always Visible */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
          <div className="mt-3 text-center">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {t('chat.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;