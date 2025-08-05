import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { ChevronLeft, ChevronRight, Expand, Download } from 'lucide-react';

const ThreeDRendersPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = React.useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage('3dRender', { text: message, sender: 'user' });
      setMessage('');
      // Mock bot response
      setTimeout(() => {
        sendMessage('3dRender', { text: "I'm sorry, I'm just a demo. I can't really talk.", sender: 'bot' });
      }, 1000);
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId="3dRender" />
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <div className="flex-1 flex items-center justify-center">
            <img src="/3d-render-placeholder.png" alt="3D Render Placeholder" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button className={isDark ? 'text-gray-400' : 'text-gray-500'}><ChevronLeft size={20} /></button>
              <span>2/2</span>
              <button className={isDark ? 'text-gray-400' : 'text-gray-500'}><ChevronRight size={20} /></button>
            </div>
            <div className="flex items-center gap-4">
              <button className={isDark ? 'text-gray-400' : 'text-gray-500'}><Expand size={20} /></button>
              <button className={isDark ? 'text-gray-400' : 'text-gray-500'}><Download size={20} /></button>
            </div>
          </div>
        </div>
        {/* Chat History */}
        <div className={`w-1/3 border-l ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
          <div className="flex-1 p-6 overflow-y-auto">
            {messages['3dRender']?.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <ChatInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ThreeDRendersPage;