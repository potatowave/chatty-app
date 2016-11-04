import React, {Component} from 'react';

class Message extends React.Component {

  render() {

    console.log("Rendering Message")
    console.log("color:", this.props.color)

    return (

      <div>
        <div className="message">
          <span className="username" style={{ color: this.props.color }}>{this.props.user}</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message system">

        </div>
      </div>

    );

  }

}

export default Message;