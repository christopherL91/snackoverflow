'use strict';

import 'whatwg-fetch';

console.log('hello world');

const serverURL `http://${addr}`;

const statusOK = (response) => {
	if(response.status >= 200 && response.status < 300) {
		return response.json();
	} else {
		return Promise.reject();
	}
};

const getData = (url, data) => {
	return fetch(url, {
	  	method: "POST",
	  	body: JSON.stringify(data),
	  	headers: {
	    	"Content-Type": "application/json"
	  	}
	})
	.then(response => statusOK(response))
	.catch(function(ex) {
	    console.log('parsing failed', ex)
	});
};

getData('http://localhost:3000', {

}).then(data => console.log(data));