const sendCommand = command => {
	//TODO socket stuff for sending commands
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
