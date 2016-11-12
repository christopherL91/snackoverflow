'use strict';

import {setupKeyEvents} from './commands.js';
import {getData} from './http.js';
import {drawSquare} from './draw.js';
import EventEmitter from 'events';

const NAME = 'ducky';

const init = (url) => {
	const socketUrl = `ws://localhost:3000/ws`;
	const socket = new WebSocket(socketUrl);
    const emitter = new EventEmitter();
	setupKeyEvents(emitter, socket);

    emitter.on('scan', entities => {
        entities.forEach(ent => {
            const {position} = ent;
            if(ent.name !== NAME) {
                drawSquare(postion, fillstyle='red');
            } else {
                drawSquare(postion);
            }
        });
    });

    emitter.on('move', data => {
        const {to, from} = data;
        drawSquare(from, fillstyle='white');
        drawSquare(to);
    });

	getData(url)
	.then(data => {
		const {Area} = data;
		let canvas = document.getElementById("canvas");
		const width = Area.length;
		const height = Area[1].length;
		const mult = 20;
		canvas.setAttribute('width', width*mult);
		canvas.setAttribute('height', height*mult);
		let ctx = canvas.getContext('2d');
		ctx.fillRect(0, 0, width*mult, height*mult);

	    for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				if(Area[i][j] != 1) {
					ctx.clearRect(i*mult, j*mult, mult, mult);
				}
			}
		}
	});
}

init('http://localhost:3000');
