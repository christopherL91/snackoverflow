export const drawSquare = (position, mult=20, fillstyle="green") => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = fillstyle;
	const [x, y] = position;
	ctx.fillRect(x, y, mult, mult);
}
