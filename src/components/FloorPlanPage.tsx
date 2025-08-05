import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import ChatInput from './ChatInput';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import FloorPlanModal from './FloorPlanModal';

const FloorPlanPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage } = useChat();
  const sessionId = 'floorPlan';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(sessionId, { text: message, sender: 'user' });
      setMessage('');
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden min-h-0">
        {/* Left Column: Generated Image */}
        <div className="flex flex-col items-center justify-center overflow-y-auto">
          <div className={`w-full h-full flex items-center justify-center border-2 border-dashed rounded-xl ${isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
            <img src="/floorplan-placeholder.png" alt="Floor plan placeholder" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Image Navigation and Action Controls */}
          <div className="w-full flex justify-between items-center mt-4">
            <button
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-xs py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {t('floorPlan.generateButton')}
          </button>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <ChevronLeft size={20} className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>2/2</span>
              <button className={`p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <ChevronRight size={20} className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Expand size={20} className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              <button className={`p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Download size={20} className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Conversation History */}
        <div className={`col-span-1 flex flex-col border-l ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </div>
          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
      <FloorPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FloorPlanPage;