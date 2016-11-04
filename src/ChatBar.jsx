import React, {Component} from 'react';

class ChatBar extends React.Component {

  constructor(props) {

    super(props);
    this.state = {value: '', username: props.currentUser};
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleMessageEnter = this.handleMessageEnter.bind(this);
    this.handleUserEnter = this.handleUserEnter.bind(this);

  }

  handleChange(event) {

    this.setState({
      value: event.target.value
    });

  }

  handleUserChange(event) {

    console.log(this.props.currentUser)

    this.setState({
      username: event.target.value
    });

  }

  handleMessageEnter(event) {

    if (event.which === 13) {
      // key.target targets value
      this.props.addMessage(event.target.value)
      this.setState({value: ''});

    }
  }

  handleUserEnter(event) {

    if (event.which === 13) {
      this.props.updateCurrentUser(event.target.value)
    }
  }



  render() {

    return (
      <footer>

          <input id="username" type="text" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.handleUserChange} onKeyUp={this.handleUserEnter} />
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleMessageEnter} />

      </footer>
    );

  }

}

export default ChatBar;