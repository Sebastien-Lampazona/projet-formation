import React from 'react';
import PropTypes from 'prop-types';

function Message({ message, isMine }) {
  return (
    <div className={`chat-message ${isMine ? 'chat-message--mine' : ''}`}>
      <p className="message-content">{message}</p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};

Message.defaultProps = {
  isMine: false,
};
export default Message;
