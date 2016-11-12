'use strict';

const sendCommand = (socket, command) => {
	//TODO socket stuff for sending commands
	socket.send(command);
	//console.log(command);
};

const createCommand = charName => {
	//{"command": "create", "name": <charName>}
	return JSON.stringify({command: "create", name: charName})
};

const moveCommand = (CharName, x, y) => {
	//{"command": "move", "name": <charName>, "dx": [-1, 0, 1], "dy": [-1, 0, 1]}
	return JSON.stringify({command: "move", name: CharName, dx: x, dy: y});
};

const scanCommand = CharName => {
	//{"command": "scan", "name": <charName>}
	return JSON.stringify({command: "scan", name: CharName});
};

const listenCommands = (emitter, socket) => {
    socket.onmessage = ({data}) => {
    	console.log(data);
        emitter.emit('scan', JSON.parse(data));
    };
};

export const setupKeyEvents= (emitter, socket) => {
	listenCommands(emitter, socket);
	// listen for the "keypress" event
	document.onkeypress = function(e) {
		const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		const key = charCode? String.fromCharCode(charCode) : undefined;
		let playerName = 'ducky';
	  	if (key == 'q') {
			sendCommand(socket, moveCommand(playerName, -1, -1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'w') {
			sendCommand(socket, moveCommand(playerName, 0, -1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'e') {
			sendCommand(socket, moveCommand(playerName, 1, -1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'a') {
			sendCommand(socket, moveCommand(playerName, -1, 0))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'd') {
			sendCommand(socket, moveCommand(playerName, 1, 0))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'z') {
			sendCommand(socket, moveCommand(playerName, -1, 1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'x') {
			sendCommand(socket, moveCommand(playerName, 0, 1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'c') {
			sendCommand(socket, moveCommand(playerName, 1, 1))
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 's') {
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'k') {
			sendCommand(socket, createCommand(playerName))
			sendCommand(socket, scanCommand(playerName))
	  	}
	};
};
