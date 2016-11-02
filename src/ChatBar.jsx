import React, {Component} from 'react';

function textEntered(text) {

  // when the user types some text then presses enter
  // this function calls the app component

}

function onSubmit() {
  alert("Test")
}

class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Text field value is: ' + this.state.value);
  }

  handleEnter(key) {
    if (key.which === 13) {
      // key.target targets value
      console.log("enter ", this.props);
      //this.props.addMessage(key.target.value);

    }
  }

  render() {

    return (
      <footer>

          <input id="username" type="text" placeholder="Your Name (Optional)" value={ this.props.currentUser } />
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleEnter} />

      </footer>
    );

  }
}

export default ChatBar;