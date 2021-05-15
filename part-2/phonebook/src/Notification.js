import React from "react";
import "./index.css";
const Notification = ({ message, isError }) => {
  console.log(isError);
  if (message === null) {
    return null;
  }
  return (
    <div className={`${isError ? "error" : "success"} notification`}>
      {message}
    </div>
  );
};

export default Notification;
