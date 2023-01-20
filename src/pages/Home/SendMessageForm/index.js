import { useDispatch } from 'react-redux';
import React, { useCallback, useState } from 'react';
import './styles.scss';
import { sendMessage } from 'src/actions/messages';

function SendMessageForm() {
  const [inputTextValue, setInputTextValue] = useState('');
  const dispatch = useDispatch();
  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      console.log('Envoie du message', inputTextValue);
      // socket.emit('message', inputTextValue);
      dispatch(sendMessage(inputTextValue));
      setInputTextValue('');
    },
    [inputTextValue],
  );
  return (
    <form className="send-message-form" onSubmit={handleSubmitForm}>
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
