import React, { useState } from 'react';
import Header from 'src/pages/Home/Header';
import MessagesList from 'src/pages/Home/MessagesList';
import SendMessageForm from 'src/pages/Home/SendMessageForm';
import './styles.scss';

function Home() {
  return (
    <div className="chat-container">
      <Header />
      <MessagesList />
      <SendMessageForm />
    </div>
  );
}
export default Home;
