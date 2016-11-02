import React, {Component} from 'react';

class Message extends React.Component {



  render() {

    console.log("Rendering Message")

    return (

      <div>
        <div className="message">
          <span className="username">{this.props.user}</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message system">

        </div>
      </div>

    );

  }

}

export default Message;