import React, {Component} from 'react';

class Message extends React.Component {

  render() {

    console.log("Rendering Notication")

    console.log(this.props)

    return (



      <div>
        <div className="message system">
          <span className="content">{this.props.olduser} has changed his name to {this.props.newuser}.</span>
        </div>

      </div>

    );

  }

}

export default Message;