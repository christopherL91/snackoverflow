'use strict';

import Router from 'koa-router';

import dungeon from '../utils/dungeon.js';
import {getRandomNumber} from '../utils/misc.js';

export default (config) => {
    const router = new Router();

    router.get('/', async (ctx) => {
        const rooms = getRandomNumber(4, 12);
        const data = dungeon([50,50], rooms);
        ctx.body = {Area: data};
    });

    router.get('/ws', async ctx => {
        ctx.websocket.send('Hello World');
        ctx.websocket.on('message', message => {
            console.log(message);
        });
    });
    return router;
};
