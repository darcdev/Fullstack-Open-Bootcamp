import { connect } from 'react-redux';

const Notification = ({ notifications }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (!notifications.message) return null;
  return <div style={style}>{notifications.message}</div>;
};

const mapStateToProps = ({ notifications }) => {
  return {
    notifications,
  };
};

const connectNotifications = connect(mapStateToProps)(Notification);
export default connectNotifications;
