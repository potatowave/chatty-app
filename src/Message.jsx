import React, { Component } from 'react';

class Message extends React.Component {

  render() {
    console.log('Rendering Message');

    if (/(https?:\/\/.*\.(?:png|jpg))/i.exec(this.props.content)) {
          return (

      <div>
        <div className="message">
          <span className="username" style={{ color: this.props.color }} > { this.props.user }</span>
          <span className="content"><img src={this.props.content} width="60%"/></span>
        </div>
        <div className="message system" />
      </div>

    );

    } else {

    return (

      <div>
        <div className="message">
          <span className="username" style={{ color: this.props.color }} > { this.props.user }</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message system" />
      </div>

    );

  }
  }

}

export default Message;
