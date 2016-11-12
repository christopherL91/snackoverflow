'use strict';

import './commands.js' 

const statusOK = (response) => {
	if(response.status >= 200 && response.status < 300) {
		return response.json();
	} else {
		return Promise.reject();
	}
};

const getData = (url) => {
	return fetch(url, {
	  	method: "GET",
	  	headers: {
	    	"Content-Type": "application/json"
	  	}
	})
	.then(response => statusOK(response))
	.catch(error => {
	    console.log(`Error: ${error}`);
	});
};

const drawDude = (position, mult=20) => {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext('2d');
	ctx.fillStyle = "red";
	const [x, y] = position;
	ctx.fillRect(x, y, mult, mult);
}

getData('http://localhost:3000')
.then(data => {
	let dungeonmap = '';
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
		dungeonmap += "<br/>";
	}
    const node = document.getElementById('map');
    node.innerHTML = dungeonmap;
});

