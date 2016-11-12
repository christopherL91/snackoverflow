'use strict';

import irc from 'irc';
import ipee from 'ip';

export default (url) => {
	const client = new irc.Client(url, 'snackOverflow', {
		channels: ['#dungeon']
	});
	console.log("ipee", ipee.address());
	setInterval(() => {
		client.say('#dungeon', JSON.stringify({
			name: 'snackOverflow', 
			address: ipee.address(), 
			info: "not working atm"
		}));
	}, 10000);

}