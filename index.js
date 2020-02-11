const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let SERVER_PARTY = [
	{
		description           : null,
		reservationTime       : null,
		id                    : 0.9322715463474562,
		isReservation         : false,
		isOverdue             : false,
		isUpcomingReservation : false,
		isOverlap             : false,
		name                  : null,
		numberInParty         : 4,
		paid                  : true,
		rowNum                : 1,
		times                 : { minute: 34, hour: 19, start: '7:34 PM', end: '8:34 PM', timeStamp: 1581035640 }
	}
];

io.on('connection', (socket) => {
	console.log('New Connection');

	socket.on('client_send', (socketState) => {
		// console.log(clientState);
		// console.log([...socketState, ...SERVER_PARTY]);

		socket.broadcast.emit('server_send', [ ...socketState ]);
		socket.emit('server_send', [ ...socketState ]);
	});

	socket.on('disconnect', () => {
		console.log('User disconnect');
	});
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
