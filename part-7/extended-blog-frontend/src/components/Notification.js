import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);

  if (!message) return null;

  return <div>{message}</div>;
};
export default Notification;
