// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let userCount = 0;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  //console.log('Client connected');

  const userColor = getRandomColor();

  ws.send(JSON.stringify({ type: 'color', data: userColor }));

  userCount += 1;

  ws.on('message', (message) => {
    //console.log('Message received:');
    const messageParsed = JSON.parse(message);

    if (messageParsed.type === 'postMessage') {
      messageParsed.type = 'incomingMessage';
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(messageParsed));
      });
    } else if (messageParsed.type === 'postNotification') {
      messageParsed.type = 'incomingNotification';
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(messageParsed));
      });
    } else {
      //console.log('Received unknown message.');
    }
  });

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.

  ws.on('close', () => {
    userCount -= 1;
    //console.log('Client disconnected');
  });
  wss.broadcast(JSON.stringify({
    type: 'userCount',
    data: {
      userCount,
    },
  }));
});

// Broadcast to all.
wss.broadcast = function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};
