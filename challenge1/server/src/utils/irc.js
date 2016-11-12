'use strict';

import irc from 'irc';
import ipee from 'ip';

export default (url) => {
	const client = new irc.Client(url, 'snackOverflow', {
		channels: ['#dungeon']
	});
    const ip = ipee.address();
	console.log(`Running on IP ${ip}`);
	setInterval(() => {
		client.say('#dungeon', JSON.stringify({
			name: 'snackOverflow',
			address: `${ip}:3000`,
			info: "Up and running, welcome! :)",
		}));
	}, 10000);

    process.on('SIGINT', () => client.disconnect());
};
