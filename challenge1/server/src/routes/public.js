'use strict';

import Router from 'koa-router';

import dungeon from '../utils/dungeon.js';
import {getRandomNumber} from '../utils/misc.js';
import command from '../utils/parse.js';
import Game from '../utils/game.js';

export default (config) => {
    const router = new Router();
    const game = new Game();
    const data = game.getData();

    router.get('/', async (ctx) => {
        ctx.body = {Area: data};
    });

    router.get('/ws', async ctx => {
        const parse = command(game);
        ctx.websocket.on('message', message => {
            try{
                const data = parse(JSON.parse(message));
                if (data) ctx.websocket.send(JSON.stringify(data));
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
