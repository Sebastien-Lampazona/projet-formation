/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useRef } from 'react';
import Message from 'src/pages/Home/MessagesList/Message';

import { Virtuoso } from 'react-virtuoso';

import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from 'src/actions/messages';

function MessagesList() {
  const virtuosoRef = useRef(null);
  const messagesList = useSelector((state) => state.messages.list)

  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   const onMessageReceived = (message) => {
  //     console.log('Reception d\'un message', message);
  //     dispatch(addMessage(message));
  //   };
  //   socket.on('message', onMessageReceived);
  //   return () => socket.off('message', onMessageReceived);
  // }, [socket]);

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
