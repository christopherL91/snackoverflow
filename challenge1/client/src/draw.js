export const drawSquare = (position, fillstyle="red", mult=20) => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = fillstyle;
	const [x, y] = position;
	ctx.fillRect(x*mult, y*mult, mult, mult);
}

export const drawNewMap = data => {
	const Area = data;
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
}