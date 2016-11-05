import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends React.Component {

  render() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) => {
          if (message.type === 'incomingMessage') {
            return (<Message
              content={message.content}
              user={message.username}
              key={message.key}
              color={message.color}
            />);
          } else if (message.type === 'incomingNotification') {
            return (<Notification
              olduser={message.oldUsername}
              newuser={message.newUsername}
              key={message.key}
            />);
          }

          return (<div>Error rendering message list.</div>);
        })
      }

      </div>
    );
  }
}

export default MessageList;
