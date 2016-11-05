import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const uuid = require('node-uuid');

const socket = new WebSocket('ws://localhost:4000');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usercount: 0,
      usercolor: 'black',
    };

    this.addMessage = this.addMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      switch (eventData.type) {
        case 'color': {
          const userColor = eventData;
          this.setState({ usercolor: userColor.data });
          break;
        }

        case 'incomingMessage': {
          const newMessage = eventData;
          const messages = this.state.messages.concat(newMessage);
          this.setState({ messages });
          break;
        }

        case 'incomingNotification': {
          const newNotification = eventData;
          const notification = this.state.messages.concat(newNotification);
          this.setState({ messages: notification });
          break;
        }

        case 'userCount': {
          const userCount = eventData;
          this.setState({ usercount: userCount.data.userCount });
          break;
        }

        default: {
            // show an error in the console if the message type is unknown
          throw new Error(`Unknown event type ${event.type}`);
        }
      }
    };
  }

  addMessage(text) {
    const newMessage = {
      key: uuid.v1(),
      username: this.state.currentUser.name,
      content: text,
      type: 'postMessage',
      color: this.state.usercolor,
    };

    const messages = this.state.messages.concat(newMessage);

    socket.send(JSON.stringify(newMessage), () => {
      this.setState(JSON.stringify({ messages }));
    });
  }

  updateCurrentUser(user) {
    this.setState({ currentUser: { name: user } });

    const updatedCurrentUser = {
      newUsername: user,
      oldUsername: this.state.currentUser.name,
      type: 'postNotification',
      key: uuid.v1(),
    };

    socket.send(JSON.stringify(updatedCurrentUser), () => {
      this.setState({ currentUser: { name: user } });
    });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
            <div className="userCount">Users Online: { this.state.usercount }</div>
          </nav>

          <MessageList messages={this.state.messages} color={this.state.color} />
          <ChatBar
            currentUser={this.state.currentUser.name}
            addMessage={this.addMessage}
            updateCurrentUser={this.updateCurrentUser}
            color={this.state.usercolor}
          />
        </div>
      </div>

    );
  }

}

export default App;
