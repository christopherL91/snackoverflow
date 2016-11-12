(function () {
'use strict';

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
