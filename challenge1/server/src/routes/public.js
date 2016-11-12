'use strict';

import Router from 'koa-router';

import dungeon from '../utils/dungeon.js';

export default (config) => {
    const router = new Router();

    router.get('/', async (ctx) => {
        const data = dungeon([50,50]);
        ctx.body = {Area: data};
    });
    return router;
};
