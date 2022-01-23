import React from "react";

const Notification = ({ notification: { message, type } }) => {
  return (
    <div className={`error ${type === "success" ? "success" : ""}`}>
      {message}
    </div>
  );
};

export default Notification;
