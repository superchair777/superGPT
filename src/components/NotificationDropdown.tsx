import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NotificationDropdownProps {
  isOpen: boolean;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen }) => {
  const { isDark } = useTheme();
  const { notifications } = useNotifications();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className={`
      absolute top-14 right-4 w-80 rounded-lg shadow-lg z-20
      ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <div className="p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}">
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('notifications.title')}</h3>
      </div>
      <div className="py-1">
        {notifications.map((notification) => (
          <div key={notification.id} className={`px-3 py-2 transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{notification.title}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{notification.message}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;