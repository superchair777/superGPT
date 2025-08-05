import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, X, MessageSquare, Edit2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const todayChats = [
    { icon: MessageSquare, label: 'Chair brand comparison' },
    { icon: MessageSquare, label: 'Becoming a developer' },
  ];

  const previousChats = [
    { icon: MessageSquare, label: t('chat.logoCreation') },
    { icon: MessageSquare, label: t('chat.exampleChat') },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className={`absolute top-4 left-4 right-4 sm:left-auto sm:w-96 rounded-2xl shadow-2xl ${isDark ? 'bg-[#2f2f2f]' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="relative">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder={t('sidebar.searchChats')}
              className={`w-full bg-transparent pl-10 pr-10 py-2 rounded-lg border-none outline-none ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
            />
            <button onClick={onClose} className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full ${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4">
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Edit2 size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('sidebar.newChat')}</span>
          </button>
        </div>
        <div className="p-4">
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('search.today')}</h3>
          {todayChats.map((chat, index) => (
            <button key={index} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <chat.icon size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{chat.label}</span>
            </button>
          ))}
        </div>
        <div className="p-4 pt-0">
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('search.previous')}</h3>
          {previousChats.map((chat, index) => (
            <button key={index} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <chat.icon size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{chat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;