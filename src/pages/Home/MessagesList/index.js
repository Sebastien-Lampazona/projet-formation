import React from 'react';
import Message from 'src/pages/Home/MessagesList/Message';

import './styles.scss';

function MessagesList() {
  return (
    <div className="chat-messages-list">
      <Message message="Hello" />
      <Message message="Hello" isMine />
      <Message message="Comment vas-tu ?" isMine />
      <Message message="Et bien ça va bien merci et toi ?" />
      <Message message="Super nickel👌" isMine />
      <Message message="I love cheese, especially cheese and wine cottage cheese. Cauliflower cheese who moved my cheese lancashire blue castello feta cheese strings danish fontina babybel. Smelly cheese danish fontina caerphilly camembert de normandie stinking bishop boursin cheese on toast babybel. Bocconcini melted cheese cheddar caerphilly cow halloumi cream cheese." />
      <Message message="Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis." isMine />
    </div>
  );
}
export default MessagesList;
