import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('node-uuid');

var socket = new WebSocket("ws://localhost:4000");

class App extends Component {

  constructor(props) {

    console.log("Rendering constructor")
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usercount: 0,
      usercolor: 'black'
    }

    this.addMessage = this.addMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  addMessage(text) {

      const newMessage = {key: uuid.v1(), username: this.state.currentUser.name, content: text, type: 'postMessage', color: this.state.usercolor };
      debugger;
      const messages = this.state.messages.concat(newMessage);

      socket.send(JSON.stringify(newMessage), () => {
        this.setState(JSON.stringify({messages: messages}))
      });

  }

  updateCurrentUser(user) {

    console.log("Input:", user);

    console.log("before", this.state.currentUser);

    this.setState({currentUser: {name: user}})

    console.log("after", this.state.currentUser);

    let updatedCurrentUser = { newUsername: user , oldUsername: this.state.currentUser.name, type: 'postNotification', key: uuid.v1() };

    socket.send(JSON.stringify(updatedCurrentUser), () => {
      this.setState({currentUser: {name: user}})
    });

  }

  render() {

    console.log("Rendering App")
    return (
      <div>
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
            <div className="userCount">Users Online: { this.state.usercount }</div>
          </nav>

          <MessageList messages={this.state.messages} color={this.state.color} />
          <ChatBar  currentUser={this.state.currentUser.name}
                    addMessage={this.addMessage}
                    updateCurrentUser={this.updateCurrentUser} />
        </div>
      </div>
    );
  }

    componentDidMount() {

    console.log("componentDidMount <App />");

    socket.onmessage = (event) => {

      event = JSON.parse(event.data)

      switch(event.type) {
        case "color":
          const userColor = event;
          this.setState({usercolor: userColor.data});
        case "incomingMessage":
          const newMessage = event;
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          const newNotification = event;
          const notification = this.state.messages.concat(newNotification)
          this.setState({messages: notification})
          break;
        case "userCount":
          const userCount = event;
          this.setState({usercount: userCount.data.userCount})
          console.log(userCount.data.userCount);
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + event.type);
    }

    }

  }



}

export default App;
