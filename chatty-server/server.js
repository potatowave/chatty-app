// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let userCount = 0;

var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colors.sort(function(a,b) { return Math.random() > 0.5; } );

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

  userColor = colors.shift();

  console.log(userColor)

  ws.send(JSON.stringify({ type:'color', data: userColor }));

  userCount += 1;

    ws.on('message', function incoming(message) {
      console.log("Message received:", message)
      message = JSON.parse(message);



      if (message.type === "postMessage") {

        message.type = "incomingMessage";
        wss.clients.forEach((client) => {
          console.log(client)
          client.send(JSON.stringify(message));
        });

      } else if (message.type === "postNotification") {

        message.type = "incomingNotification";
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(message));
        });

      } else {
        console.log("Received unknown message: ", message)
      }

    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount -= 1;
    console.log('Client disconnected')});
    wss.broadcast(JSON.stringify({
        type: 'userCount',
        data: {
          userCount: userCount
        }
      }));
  });

// Broadcast to all.
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};