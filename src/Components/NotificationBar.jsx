// NotificationBar.js
import React from 'react';

const NotificationBar = ({ message, visible }) => {
  return (
    visible && (
      <div className="absolute bottom-0 right-0  mr-4 w-64 bg-red-600 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
        {message}
      </div>
    )
  );
};

export default NotificationBar;
