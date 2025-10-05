// src/components/notification/useNotification.js
import { useContext } from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return ctx; // { notify, remove }
};
