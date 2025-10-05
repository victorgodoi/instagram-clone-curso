// src/components/notification/NotificationProvider.jsx
import { createContext, useCallback, useState } from 'react';
import NotificationList from '../components/Notification';

export const NotificationContext = createContext({
  notify: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback(({ type = 'success', title = '', description = '', duration = 5000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newNotification = { id, type, title, description, duration };

    setNotifications((prev) => [newNotification, ...prev]);

    // auto remove after duration
    if (duration && duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const remove = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notify, remove }}>
      {children}
      <NotificationList notifications={notifications} onRemove={remove} />
    </NotificationContext.Provider>
  );
};
