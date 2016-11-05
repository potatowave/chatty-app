import React, { Component } from 'react';

class Message extends React.Component {

  render() {
    if (/(https?:\/\/.*\.(?:png|jpg|gif))/i.exec(this.props.content)) {
      return (

        <div>
          <div className="message">
            <span className="username"
              style={{ color: this.props.color }}
            >
              { this.props.user }
            </span>
            <span className="content">
              <img src={this.props.content} width="60%" alt="User Posted Thing" />
            </span>
          </div>
          <div className="message system" />
        </div>

      );
    }

    return (

      <div>
        <div className="message">
          <span className="username"
            style={{ color: this.props.color }}
          > { this.props.user }</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message system" />
      </div>

    );
  }

}

Message.propTypes = {
  color: React.PropTypes.node,
  user: React.PropTypes.node,
  content: React.PropTypes.node,
};

export default Message;
