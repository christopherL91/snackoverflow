'use strict';

import Dungeon from 'dungeon-generator';

export default (size = [50,50]) => {
    const dungeon = new Dungeon({
        size,
        rooms: {
            initial: {
                min_size: [2, 3],
                max_size: [5, 6],
                max_exits: 1,
                position: [0, 0]
            },
            any: {
                min_size: [2, 3],
                max_size: [5, 6],
                max_exits: 4
            }
        },
        max_corridor_length: 6,
        min_corridor_length: 2,
        corridor_density: 0.5,
        symmetric_rooms: false,
        interconnects: 1,
        max_interconnect_length: 10,
        room_count: 10
    });

    dungeon.generate();
    const [x,y] = dungeon.size;
    let data = new Array(y);
    for (let i = 0; i < y; i++) {
        data[i] = new Array(x);
    }
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            let wall = dungeon.walls.get([i, j]);
            if (wall) {
                data[i][j] = 1;
            } else {
                data[i][j] = 0;
            }
        }
    }
    return data;
};
