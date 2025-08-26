import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useTasks } from '../contexts/TaskContext';
import { useChat } from '../contexts/ChatContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import NotificationDropdown from './NotificationDropdown';
import ExportModal from './ExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskModal from './TaskModal';
import { Bell, Share2, Trash2, CheckSquare } from 'lucide-react';

interface HeaderProps {
  sessionId?: string;
}

const Header: React.FC<HeaderProps> = ({ sessionId }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { unreadCount, markAsRead } = useNotifications();
  const { unreadTaskCount, markTasksAsRead } = useTasks();
  const { messages: allMessages, startNewChat } = useChat();
  const messages = sessionId ? allMessages[sessionId] || [] : [];
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markAsRead();
    }
  };

  const handleTaskClick = () => {
    setShowTasks(!showTasks);
    if (!showTasks) {
      markTasksAsRead();
    }
  };

  return (
    <>
      <div className={`flex items-center justify-between p-4 ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <select className={`bg-transparent text-lg font-medium border-none outline-none cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <option value="supergpt">{t('header.title')}</option>
          </select>
        </div>
        <div className="flex items-center gap-3 relative">
          {sessionId && messages.length > 0 && (
            <>
              <button onClick={() => setShowExport(true)} className={`flex items-center gap-2 p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                <Share2 size={18} />
                <span className="text-sm sr-only">{t('chat.share')}</span>
              </button>
              <button onClick={() => setShowDelete(true)} className={`flex items-center gap-2 p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                <Trash2 size={18} />
                <span className="text-sm sr-only">{t('chat.delete')}</span>
              </button>
            </>
          )}
          <button
           onClick={handleTaskClick}
           className={`relative p-2 rounded-full transition-colors ${
             isDark
               ? 'text-gray-400 hover:text-white hover:bg-gray-700'
               : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
           }`}
         >
           <CheckSquare size={20} />
           {unreadTaskCount > 0 && (
             <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
               {unreadTaskCount}
             </span>
           )}
          </button>
          <button
           onClick={handleNotificationClick}
           className={`relative p-2 rounded-full transition-colors ${
             isDark
               ? 'text-gray-400 hover:text-white hover:bg-gray-700'
               : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
           }`}
         >
           <Bell size={20} />
           {unreadCount > 0 && (
             <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
               {unreadCount}
             </span>
           )}
          </button>
          <NotificationDropdown isOpen={showNotifications} />
          <LanguageToggle />
          <ThemeToggle />
        </div>
     </div>
      <TaskModal isOpen={showTasks} onClose={() => setShowTasks(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
      <DeleteConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          if (sessionId) {
            startNewChat(sessionId);
          }
          setShowDelete(false);
        }}
      />
    </>
  );
};

export default Header;