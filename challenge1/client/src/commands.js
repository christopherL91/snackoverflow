
const sendCommand = (socket, command) => {
	//TODO socket stuff for sending commands
	socket.send(command);
	//console.log(command);
}

const createCommand = charName => {
	//{"command": "create", "name": <charName>}
	return JSON.stringify({command: "create", name: charName})
}

const moveCommand = (CharName, x, y) => {
	//{"command": "move", "name": <charName>, "dx": [-1, 0, 1], "dy": [-1, 0, 1]}
	return JSON.stringify({command: "move", name: CharName, dx: x, dy: y});
}

const scanCommand = CharName => {
	//{"command": "scan", "name": <charName>}
	return JSON.stringify({command: "scan", name: CharName});
}

export const setupKeyEvents= (socket) => {
	// listen for the "keypress" event
	document.onkeypress = function(e) {
		const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		const key = charCode? String.fromCharCode(charCode) : undefined;
		let playerName = 'ducky';
	  	if (key == 'q') {
			sendCommand(socket, moveCommand(playerName, -1, -1))
	  	} else if (key === 'w') {
			sendCommand(socket, moveCommand(playerName, 0, -1))
	  	} else if (key === 'e') {
			sendCommand(socket, moveCommand(playerName, 1, -1))
	  	} else if (key === 'a') {
			sendCommand(socket, moveCommand(playerName, -1, 0))
	  	} else if (key === 'd') {
			sendCommand(socket, moveCommand(playerName, 1, 0))
	  	} else if (key === 'z') {
			sendCommand(socket, moveCommand(playerName, -1, 1))
	  	} else if (key === 'x') {
			sendCommand(socket, moveCommand(playerName, 0, 1))
	  	} else if (key === 'c') {
			sendCommand(socket, moveCommand(playerName, 1, 1))
	  	} else if (key === 's') {
			sendCommand(socket, scanCommand(playerName))
	  	} else if (key === 'k') {
			sendCommand(socket, createCommand(playerName))
	  	} 
	};
};