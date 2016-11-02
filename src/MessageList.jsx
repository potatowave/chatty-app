import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {

    console.log("Rendering MessageList")

    return (

      <div id="message-list">

        {this.props.messages.map((message) => {
          return <Message
            content={message.content}
            user={message.username}
            key={message.key} />
          })
        }

      </div>

    );

  }
}

export default MessageList;