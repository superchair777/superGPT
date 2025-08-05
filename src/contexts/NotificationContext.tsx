import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        title: t('notifications.announcement'),
        message: t('notifications.q3Report'),
        time: '15m ago',
      },
      {
        id: 2,
        title: t('notifications.superSearch'),
        message: t('notifications.searchFaster'),
        time: '1h ago',
      },
      {
        id: 3,
        title: t('notifications.maintenance'),
        message: t('notifications.maintenanceMessage'),
        time: '1d ago',
      },
    ];
    setNotifications(mockNotifications);
  }, [language, t]);

  const unreadCount = notifications.length - readIds.size;

  const markAsRead = () => {
    const allIds = new Set(notifications.map(n => n.id));
    setReadIds(allIds);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};