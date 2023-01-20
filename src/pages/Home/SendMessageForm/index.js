import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { send as sendMessageAction } from 'src/features/messages/messagesSlice';
import './styles.scss';

function SendMessageForm() {
  const [inputTextValue, setInputTextValue] = useState('');
  const dispatch = useDispatch();

  const sendMessage = useCallback(
    (event) => {
      event.preventDefault();
      console.log('Envoie du message', inputTextValue);
      dispatch(sendMessageAction(inputTextValue));
      setInputTextValue('');
    },
    [inputTextValue],
  );
  return (
    <form className="send-message-form" onSubmit={sendMessage}>
      <input
        type="text"
        value={inputTextValue}
        onChange={(event) => setInputTextValue(event.target.value)}
        className="send-message-form__input"
        placeholder="Votre message"
      />
      <button type="submit" className="send-message-form__button">
        Envoyer
      </button>
    </form>
  );
}
export default SendMessageForm;
