const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 'https://cattery-server.herokuapp.com/';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
console.log(process.env.PORT);

let SERVER_STATE = [];

io.on('connection', (socket) => {
	console.log('New Connection');

	socket.on('client_send', (socketState) => {
		SERVER_STATE = [ ...socketState ];
		socket.broadcast.emit('server_send', SERVER_STATE);
		socket.emit('server_send', SERVER_STATE);
	});

	socket.on('refresh_data', () => {
		socket.broadcast.emit('server_send', SERVER_STATE);
		socket.emit('server_send', SERVER_STATE);
	});

	socket.on('disconnect', () => {
		console.log('User disconnect');
	});
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
