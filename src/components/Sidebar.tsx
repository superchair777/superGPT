import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useChat } from '../contexts/ChatContext';
import { useView } from '../contexts/ViewContext';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import { 
  MessageSquare, 
  Search, 
  BookOpen, 
  Sparkles,
  Bot,
  Plus,
  Menu,
  X,
  Map,
  Box
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { user } = useUser();
  const { startNewChat } = useChat();
  const { activeView, setActiveView } = useView();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const menuItems = [
    { icon: MessageSquare, label: t('sidebar.newChat'), view: 'chat', action: 'newChat' },
    { icon: Search, label: t('sidebar.searchChats'), action: 'search' },
    { icon: BookOpen, label: t('sidebar.library'), view: 'library' },
    { icon: Map, label: t('sidebar.sora'), view: 'floorPlan' },
    { icon: Box, label: t('sidebar.gpts'), view: 'threeDRenders' },
  ];

  const chatHistory = [
    t('chat.logoCreation'),
    t('chat.exampleChat'),
    t('chat.projectPlanning'),
    t('chat.codeReview'),
  ];

  const isItemActive = (item: typeof menuItems[0]) => {
    if (item.action === 'newChat') {
      return activeView === 'chat';
    }
    return item.view === activeView;
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out
        ${isDark 
          ? 'bg-[#171717] border-r border-gray-700' 
          : 'bg-white border-r border-gray-200'
        }
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
            <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('header.title')}</h2>
            <button
              onClick={onToggle}
              className={`lg:hidden p-1 rounded-md transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.action === 'newChat') {
                      startNewChat('main');
                      setActiveView('chat');
                    } else if (item.action === 'search') {
                      setSearchOpen(true);
                    } else if (item.view) {
                      setActiveView(item.view as any);
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${isItemActive(item)
                      ? isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Chat History */}
            <div className="mt-6">
              <div className="px-4 py-2">
                <h3 className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('sidebar.chats')}
                </h3>
              </div>
              <div className="px-2">
                {chatHistory.map((chat, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors truncate ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {chat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Section */}
          <div
            className={`p-4 cursor-pointer ${isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}
            onClick={() => setModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-base font-medium overflow-hidden">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.initials
                )}
              </div>
              <div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.jobTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Sidebar;