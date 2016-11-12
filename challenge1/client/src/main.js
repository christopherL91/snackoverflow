'use strict';

import {setupKeyEvents} from './commands.js';
import {getData} from './http.js';

const init = (url) => {
	const socketUrl = `ws://localhost:3000/ws`;
	const socket = new WebSocket(socketUrl);
	setupKeyEvents(socket);
	
	getData(url)
	.then(data => {
		let dungeonmap = '';
		const {Area} = data;

	    for (let i = 0; i < Area.length; i++) {
			for (let j = 0; j < Area[i].length; j++) {
				if(Area[i][j] == 1) {
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
};

init('http://localhost:3000');