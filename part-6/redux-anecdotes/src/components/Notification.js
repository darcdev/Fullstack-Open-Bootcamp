import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification } from '../reducers/notificationReducer';
const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notifications);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  setTimeout(() => {
    dispatch(deleteNotification());
  }, 5000);
  if (!message) return null;
  return <div style={style}>{message}</div>;
};

export default Notification;
