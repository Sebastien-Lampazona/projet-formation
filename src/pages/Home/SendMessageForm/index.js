import React from 'react';
import './styles.scss';

function SendMessageForm() {
  return (
    <form className="send-message-form">
      <input type="text" className="send-message-form__input" placeholder="Votre message" />
      <button type="submit" className="send-message-form__button">Envoyer</button>
    </form>
  );
}
export default SendMessageForm;
