/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useRef } from 'react';
import Message from 'src/pages/Home/MessagesList/Message';
import { socket } from 'src/services/socket-io.client';

import { Virtuoso } from 'react-virtuoso';

import './styles.scss';

// TODO Stick to Bottom : https://virtuoso.dev/stick-to-bottom/
function MessagesList() {
  const virtuosoRef = useRef(null);
  const [messagesList, setMessagesList] = useState([
    { isMine: false, text: 'Hello' },
    { isMine: true, text: 'Hello' },
    { isMine: true, text: 'Comment vas-tu ?' },
    { isMine: false, text: 'Et bien ça va bien merci et toi ?' },
    { isMine: true, text: 'Super nickel👌' },
    {
      isMine: false,
      text: 'I love cheese, especially cheese and wine cottage cheese. Cauliflower cheese who moved my cheese lancashire blue castello feta cheese strings danish fontina babybel. Smelly cheese danish fontina caerphilly camembert de normandie stinking bishop boursin cheese on toast babybel. Bocconcini melted cheese cheddar caerphilly cow halloumi cream cheese.',
    },
    {
      isMine: true,
      text: 'Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis.',
    },
  ]);

  useEffect(() => {
    const onMessageReceived = (message) => {
      console.log('Reception d\'un message', message);
      setMessagesList((_messagesList) => [..._messagesList, { text: message, isMine: true }]);
    };
    socket.on('message', onMessageReceived);
    return () => socket.off('message', onMessageReceived);
  }, []);

  return (
    <Virtuoso
      ref={virtuosoRef}
      className="chat-messages-list"
      data={messagesList}
      initialTopMostItemIndex={messagesList.length - 1}
      itemContent={(index, message) => (
        <Message message={message.text} isMine={message.isMine} />
      )}
      atBottomStateChange={(bottom) => {
        console.log('bottom', bottom);
      }}
      followOutput="smooth"
    />
  );
}
export default MessagesList;
