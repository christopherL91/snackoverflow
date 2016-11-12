'use strict';

//WIP

import Dungeon from './dungeon.js';

export default (dungeon = dungeon([50,50])) => {
	let gamelogic = {};
	let characters = [];

	const [sizey, sizex] = dungeon.size;

	
	gamelogic.createCharacter = (name) => {
		let character = {
			name,
			position: [0, 0]
		};
		character.push(character);
		return character;
	};
	gamelogic.getCharacters = () => {
		return characters;
	}

	getCharacter = (name) => {
		const res = characters.filter((obj)=> {
			return obj.name = name;
		});
	}

	gamelogic.move = (name, dx, dy) => {
		const character = getCharacter(name);
		let [x, y] = character.position;
		character.position = [x+dx, y+dy];
	}

	gamelogic.scan = (name, area = 3) => {
		const character = getCharacter(name);
		let [x, y] = character.position;
		//Now calculate so we don't scan to much.
		let topleftx = x-area;
		let toplefty = y-area;
		if (topleftx < 0) topleftx = 0;
		if (toplefty < 0) toplefty = 0;
		let bottomrightx = x+area;
		let bottomrighty = y+area;
		if (bottomrighty > sizex) bottomrightx = sizex;
		if (bottomrightx > sizey) bottomrighty = sizey;
		//create data
		let data = []
		//scan
		for (let iy = toplefty; iy < bottomrighty; iy++) {
			for (let ix = topleftx; ix < bottomrightx; ix++) {
				if (dungeon.walls.get([iy, ix])) {
					data.push({name: "wall", x: ix, y: iy});
				} else {
					data.push({name: "empty", x: ix, y: iy});
				}
			}
		}
		// should now have the walls and empty spaces data. now just try to find characters.
		for (c in characters) {
			if (c.name != character.name) {
				//The character isn't us.
				let [cy, cx] = c.position;
				if (cy <= toplefty && cy >= bottomrighty && cx <= topleftx && cx >= bottomrightx) {
					//We can see the character! add it.
					data.push({name: c.name, x: cx, y: cy})
				}
			}
		}

	}

	return gamelogic;
};