'use strict';

const statusOK = (response) => {
	if(response.status >= 200 && response.status < 300) {
		return response.json();
	} else {
		return Promise.reject();
	}
};

export const getData = (url) => {
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