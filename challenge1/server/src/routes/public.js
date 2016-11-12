'use strict';

import Router from 'koa-router';

import dungeon from '../utils/dungeon.js';
import {getRandomNumber} from '../utils/misc.js';
import command from '../utils/parse.js';
import Game from '../utils/game.js';

export default (config) => {
    const router = new Router();
    const game = new Game();

    router.get('/', async (ctx) => {
        const rooms = getRandomNumber(4, 12);
        const {data} = dungeon([50,50], rooms);
        ctx.body = {Area: data};
    });

    router.get('/ws', async ctx => {
        const parse = command(game);
        ctx.websocket.on('message', message => {
            try{
                const data = parse(JSON.parse(message));
                ctx.websocket.send(JSON.stringify(data));
            }catch(error) {
                console.log(error);
                const msg = JSON.stringify({msg: 'Bad Command'});
                ctx.websocket.send(msg);
                ctx.websocket.close();
            }
        });
    });
    return router;
};
