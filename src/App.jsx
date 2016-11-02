import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {

    console.log("Rendering constructor")
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          key: "1",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          key: "2",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }

  }

  addMessage(text) {
      const newMessage = {key: this.state.message.length , username: this.state.currentUser.name , content: text};
      console.log(newMessage)
  }

  render() {

    console.log("Rendering App")

    return (
      <div>
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
          <MessageList messages={this.state.messages} >
          </MessageList>
          <ChatBar currentUser={this.state.currentUser.name} messages={this.state.messages} >
          </ChatBar>
        </div>
      </div>
    );
  }

    componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      console.log(messages)
      this.setState({messages: messages})
    }, 3000);
  }
}

export default App;
