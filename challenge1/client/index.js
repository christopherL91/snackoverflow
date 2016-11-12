(function () {
'use strict';

const sendCommand = command => {
	//TODO socket stuff for sending commands
	console.log(command);
};

const createCommand = charName => {
	//{"command": "create", "name": <charName>}
	return JSON.stringify({ command: "create", name: charName });
};

const moveCommand = (CharName, x, y) => {
	//{"command": "move", "name": <charName>, "dx": [-1, 0, 1], "dy": [-1, 0, 1]}
	return JSON.stringify({ command: "move", name: CharName, dx: x, dy: y });
};

const scanCommand = CharName => {
	//{"command": "scan", "name": <charName>}
	return JSON.stringify({ command: "scan", name: CharName });
};

// listen for the "keypress" event
document.onkeypress = function (e) {
	const charCode = typeof e.which == "number" ? e.which : e.keyCode;
	const key = charCode ? String.fromCharCode(charCode) : undefined;
	let playerName = 'ducky';
	if (key == 'q') {
		sendCommand(moveCommand(playerName, -1, -1));
	} else if (key === 'w') {
		sendCommand(moveCommand(playerName, 0, -1));
	} else if (key === 'e') {
		sendCommand(moveCommand(playerName, 1, -1));
	} else if (key === 'a') {
		sendCommand(moveCommand(playerName, -1, 0));
	} else if (key === 'd') {
		sendCommand(moveCommand(playerName, 1, 0));
	} else if (key === 'z') {
		sendCommand(moveCommand(playerName, -1, 1));
	} else if (key === 'x') {
		sendCommand(moveCommand(playerName, 0, 1));
	} else if (key === 'c') {
		sendCommand(moveCommand(playerName, 1, 1));
	} else if (key === 's') {
		sendCommand(scanCommand(playerName));
	} else if (key === 'k') {
		sendCommand(createCommand(playerName));
	}
};

const statusOK = response => {
	if (response.status >= 200 && response.status < 300) {
		return response.json();
	} else {
		return Promise.reject();
	}
};

const getData = url => {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => statusOK(response)).catch(error => {
		console.log(`Error: ${ error }`);
	});
};

getData('http://localhost:3000').then(data => {
	let dungeonmap = '';
	const { Area } = data;

	for (let i = 0; i < Area.length; i++) {
		for (let j = 0; j < Area[i].length; j++) {
			if (Area[i][j] == 1) {
				dungeonmap += '■';
			} else {
				dungeonmap += '□';
			}
		}
		dungeonmap += "<br/>";
	}
	const node = document.getElementById('map');
	node.innerHTML = dungeonmap;
});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbInNyYy9jb21tYW5kcy5qcyIsInNyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc2VuZENvbW1hbmQgPSBjb21tYW5kID0+IHtcblx0Ly9UT0RPIHNvY2tldCBzdHVmZiBmb3Igc2VuZGluZyBjb21tYW5kc1xuXHRjb25zb2xlLmxvZyhjb21tYW5kKTtcbn1cblxuY29uc3QgY3JlYXRlQ29tbWFuZCA9IGNoYXJOYW1lID0+IHtcblx0Ly97XCJjb21tYW5kXCI6IFwiY3JlYXRlXCIsIFwibmFtZVwiOiA8Y2hhck5hbWU+fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQ6IFwiY3JlYXRlXCIsIG5hbWU6IGNoYXJOYW1lfSlcbn1cblxuY29uc3QgbW92ZUNvbW1hbmQgPSAoQ2hhck5hbWUsIHgsIHkpID0+IHtcblx0Ly97XCJjb21tYW5kXCI6IFwibW92ZVwiLCBcIm5hbWVcIjogPGNoYXJOYW1lPiwgXCJkeFwiOiBbLTEsIDAsIDFdLCBcImR5XCI6IFstMSwgMCwgMV19XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeSh7Y29tbWFuZDogXCJtb3ZlXCIsIG5hbWU6IENoYXJOYW1lLCBkeDogeCwgZHk6IHl9KTtcbn1cblxuY29uc3Qgc2NhbkNvbW1hbmQgPSBDaGFyTmFtZSA9PiB7XG5cdC8ve1wiY29tbWFuZFwiOiBcInNjYW5cIiwgXCJuYW1lXCI6IDxjaGFyTmFtZT59XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeSh7Y29tbWFuZDogXCJzY2FuXCIsIG5hbWU6IENoYXJOYW1lfSk7XG59XG5cblxuXG4vLyBsaXN0ZW4gZm9yIHRoZSBcImtleXByZXNzXCIgZXZlbnRcbmRvY3VtZW50Lm9ua2V5cHJlc3MgPSBmdW5jdGlvbihlKSB7XG5cdGNvbnN0IGNoYXJDb2RlID0gKHR5cGVvZiBlLndoaWNoID09IFwibnVtYmVyXCIpID8gZS53aGljaCA6IGUua2V5Q29kZTtcblx0Y29uc3Qga2V5ID0gY2hhckNvZGU/IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGUpIDogdW5kZWZpbmVkO1xuXHRsZXQgcGxheWVyTmFtZSA9ICdkdWNreSc7XG4gIFx0aWYgKGtleSA9PSAncScpIHtcblx0XHRzZW5kQ29tbWFuZChtb3ZlQ29tbWFuZChwbGF5ZXJOYW1lLCAtMSwgLTEpKVxuICBcdH0gZWxzZSBpZiAoa2V5ID09PSAndycpIHtcblx0XHRzZW5kQ29tbWFuZChtb3ZlQ29tbWFuZChwbGF5ZXJOYW1lLCAwLCAtMSkpXG4gIFx0fSBlbHNlIGlmIChrZXkgPT09ICdlJykge1xuXHRcdHNlbmRDb21tYW5kKG1vdmVDb21tYW5kKHBsYXllck5hbWUsIDEsIC0xKSlcbiAgXHR9IGVsc2UgaWYgKGtleSA9PT0gJ2EnKSB7XG5cdFx0c2VuZENvbW1hbmQobW92ZUNvbW1hbmQocGxheWVyTmFtZSwgLTEsIDApKVxuICBcdH0gZWxzZSBpZiAoa2V5ID09PSAnZCcpIHtcblx0XHRzZW5kQ29tbWFuZChtb3ZlQ29tbWFuZChwbGF5ZXJOYW1lLCAxLCAwKSlcbiAgXHR9IGVsc2UgaWYgKGtleSA9PT0gJ3onKSB7XG5cdFx0c2VuZENvbW1hbmQobW92ZUNvbW1hbmQocGxheWVyTmFtZSwgLTEsIDEpKVxuICBcdH0gZWxzZSBpZiAoa2V5ID09PSAneCcpIHtcblx0XHRzZW5kQ29tbWFuZChtb3ZlQ29tbWFuZChwbGF5ZXJOYW1lLCAwLCAxKSlcbiAgXHR9IGVsc2UgaWYgKGtleSA9PT0gJ2MnKSB7XG5cdFx0c2VuZENvbW1hbmQobW92ZUNvbW1hbmQocGxheWVyTmFtZSwgMSwgMSkpXG4gIFx0fSBlbHNlIGlmIChrZXkgPT09ICdzJykge1xuXHRcdHNlbmRDb21tYW5kKHNjYW5Db21tYW5kKHBsYXllck5hbWUpKVxuICBcdH0gZWxzZSBpZiAoa2V5ID09PSAnaycpIHtcblx0XHRzZW5kQ29tbWFuZChjcmVhdGVDb21tYW5kKHBsYXllck5hbWUpKVxuICBcdH0gXG59OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICcuL2NvbW1hbmRzLmpzJyBcblxuY29uc3Qgc3RhdHVzT0sgPSAocmVzcG9uc2UpID0+IHtcblx0aWYocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuXHR9XG59O1xuXG5jb25zdCBnZXREYXRhID0gKHVybCkgPT4ge1xuXHRyZXR1cm4gZmV0Y2godXJsLCB7XG5cdCAgXHRtZXRob2Q6IFwiR0VUXCIsXG5cdCAgXHRoZWFkZXJzOiB7XG5cdCAgICBcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdCAgXHR9XG5cdH0pXG5cdC50aGVuKHJlc3BvbnNlID0+IHN0YXR1c09LKHJlc3BvbnNlKSlcblx0LmNhdGNoKGVycm9yID0+IHtcblx0ICAgIGNvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvcn1gKTtcblx0fSk7XG59O1xuXG5nZXREYXRhKCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKVxuLnRoZW4oZGF0YSA9PiB7XG5cdGxldCBkdW5nZW9ubWFwID0gJyc7XG5cdGNvbnN0IHtBcmVhfSA9IGRhdGE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFyZWEubGVuZ3RoOyBpKyspIHtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IEFyZWFbaV0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmKEFyZWFbaV1bal0gPT0gMSkge1xuXHRcdFx0XHRkdW5nZW9ubWFwICs9ICfilqAnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZHVuZ2Vvbm1hcCArPSAn4pahJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZHVuZ2Vvbm1hcCArPSBcIjxici8+XCI7XG5cdH1cbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xuICAgIG5vZGUuaW5uZXJIVE1MID0gZHVuZ2Vvbm1hcDtcbn0pO1xuXG4iXSwibmFtZXMiOlsic2VuZENvbW1hbmQiLCJjb21tYW5kIiwibG9nIiwiY3JlYXRlQ29tbWFuZCIsImNoYXJOYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJtb3ZlQ29tbWFuZCIsIkNoYXJOYW1lIiwieCIsInkiLCJkeCIsImR5Iiwic2NhbkNvbW1hbmQiLCJkb2N1bWVudCIsIm9ua2V5cHJlc3MiLCJlIiwiY2hhckNvZGUiLCJ3aGljaCIsImtleUNvZGUiLCJrZXkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1bmRlZmluZWQiLCJwbGF5ZXJOYW1lIiwic3RhdHVzT0siLCJyZXNwb25zZSIsInN0YXR1cyIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwiZ2V0RGF0YSIsInVybCIsImZldGNoIiwidGhlbiIsImNhdGNoIiwiZXJyb3IiLCJkYXRhIiwiZHVuZ2Vvbm1hcCIsIkFyZWEiLCJpIiwibGVuZ3RoIiwiaiIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsTUFBTUEsY0FBY0MsV0FBVzs7U0FFdEJDLEdBQVIsQ0FBWUQsT0FBWjtDQUZEOztBQUtBLE1BQU1FLGdCQUFnQkMsWUFBWTs7UUFFMUJDLEtBQUtDLFNBQUwsQ0FBZSxFQUFDTCxTQUFTLFFBQVYsRUFBb0JNLE1BQU1ILFFBQTFCLEVBQWYsQ0FBUDtDQUZEOztBQUtBLE1BQU1JLGNBQWMsQ0FBQ0MsUUFBRCxFQUFXQyxDQUFYLEVBQWNDLENBQWQsS0FBb0I7O1FBRWhDTixLQUFLQyxTQUFMLENBQWUsRUFBQ0wsU0FBUyxNQUFWLEVBQWtCTSxNQUFNRSxRQUF4QixFQUFrQ0csSUFBSUYsQ0FBdEMsRUFBeUNHLElBQUlGLENBQTdDLEVBQWYsQ0FBUDtDQUZEOztBQUtBLE1BQU1HLGNBQWNMLFlBQVk7O1FBRXhCSixLQUFLQyxTQUFMLENBQWUsRUFBQ0wsU0FBUyxNQUFWLEVBQWtCTSxNQUFNRSxRQUF4QixFQUFmLENBQVA7Q0FGRDs7O0FBUUFNLFNBQVNDLFVBQVQsR0FBc0Is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
