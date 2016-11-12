var keypress = require('keypress');

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
	if(x != -1 || x != 1) {
		x = 0;
	}
	if(y != -1 || y != 1) {
		y = 0;
	}
	return JSON.stringify({command: "move", name: CharName, dx: x, dy: y});
}

const scanCommand = CharName => {
	//{"command": "scan", "name": <charName>}
	return JSON.stringify({command: "scan", name: CharName});
}


keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  	console.log('got "keypress"', key);
  	if (key && key.name == 'q') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', -1, -1))
  	} else if (key && key.name == 'w') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', 0, -1))
  	} else if (key && key.name == 'e') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', 1, -1))
  	} else if (key && key.name == 'a') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', -1, 0))
  	} else if (key && key.name == 'd') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', 1, 0))
  	} else if (key && key.name == 'z') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', -1, 1))
  	} else if (key && key.name == 'x') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', 0, 1))
  	} else if (key && key.name == 'c') {
		sendCommand(moveCommand('INSERT_CHAR_NAME', 1, 1))
  	} else if (key && key.name == 's') {
		sendCommand(scanCommand('INSERT_CHAR_NAME'))
  	} else if (key && key.name == 'k') {
		sendCommand(createCommand('INSERT_CHAR_NAME'))
  	} 
});