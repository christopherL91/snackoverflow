
const sendCommand = command => {
	//TODO socket stuff for sending commands
	console.log(command);
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



// listen for the "keypress" event
document.onkeypress = function(e) {
	const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
	const key = charCode? String.fromCharCode(charCode) : undefined;
	let playerName = 'ducky';
  	if (key == 'q') {
		sendCommand(moveCommand(playerName, -1, -1))
  	} else if (key === 'w') {
		sendCommand(moveCommand(playerName, 0, -1))
  	} else if (key === 'e') {
		sendCommand(moveCommand(playerName, 1, -1))
  	} else if (key === 'a') {
		sendCommand(moveCommand(playerName, -1, 0))
  	} else if (key === 'd') {
		sendCommand(moveCommand(playerName, 1, 0))
  	} else if (key === 'z') {
		sendCommand(moveCommand(playerName, -1, 1))
  	} else if (key === 'x') {
		sendCommand(moveCommand(playerName, 0, 1))
  	} else if (key === 'c') {
		sendCommand(moveCommand(playerName, 1, 1))
  	} else if (key === 's') {
		sendCommand(scanCommand(playerName))
  	} else if (key === 'k') {
		sendCommand(createCommand(playerName))
		drawDude(sendCommand(scanCommand(playerName)));
  	} 
};