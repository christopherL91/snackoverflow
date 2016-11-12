'use strict';

import Router from 'koa-router';
import Dungeon from 'dungeon-generator';

export default (config) => {
    const router = new Router();

    router.get('/', async (ctx) => {
        const dungeon = new Dungeon({
            size: [5, 10],
            seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [1, 1],
                    max_size: [1, 1],
                    max_exits: 1,
                    position: [0, 0] //OPTIONAL pos of initial room
                },
                any: {
                    min_size: [1, 1],
                    max_size: [1, 1],
                    max_exits: 4
                }
            },
            max_corridor_length: 6,
            min_corridor_length: 2,
            corridor_density: 0.5, //corridors per room
            symmetric_rooms: false, // exits must be in the center of a wall if true
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 10
        });

        dungeon.generate(); // The generated dungeon object.
        const [x,y] = dungeon.size;
        let data = new Array(y);
        for (let i = 0; i < y; i++) {
            data[i] = new Array(x);
        }
        const size = dungeon.children.length;
        console.log(`SIZE: ${size}`);
        for (const piece of dungeon.children) {
            const {position} = piece;
            const [x,y] = position;
            const wall = piece.walls.get(position); // True/False
            console.log('PIECE DATA', piece);
            console.log('WALLS', piece.walls);
            console.log(`Piece ${position} size: ${piece.size}`);
            //for (let i = 0; i < y; i++) {
                //for (let j = 0; j < x; j++) {
                    //console.log(data);
                    //if(wall) {
                        //data[i + y][j + x] = 1;
                    //} else {
                        //data[i + y][j + x] = 0;
                    //}
                //}
            //}
        }

        ctx.body = {data};
    });

    return router;
};
