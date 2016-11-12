'use strict';

import dungeon from '../utils/dungeon.js';

export default class {
    constructor(args) {
        this.entities = [];
        this.dungeon = dungeon();
    }

    createCharacter(name, position) {
        this.entities.push({
            name,
            position: dungeon.start_pos,
        });
    }

    getEntity(name) {
        return this.entities.filter(ent => {
            return ent.name === name;
        })[0];
    }

    forceInbounds(position) {
        let [x, y] = position;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        const [sizeX, sizeY] = this.dungeon.size;
        if (sizeX <= x) x = sizeX - 1;
        if (sizeY <= y) y = sizeY - 1;
        return [x, y];
    }

    move(name, position) {
        const character = getEntity(name);
        const [dx, dy] = position;
        const [x,y] = character.position;
        character.position = forceInbounds([x + dx, y + dy]);
        console.log(this.entities); //Check if changed.
    }

    scan(name) {
        const character = getEntity(name);
        const [x, y] = character.position;
        const topLeft = forceInbounds([x - 3, y - 3]);
        const bottomRight = forceInbounds([x + 3, y + 3]);
        const withinSight = this.entities.filter(ent => {
            const [ex, ey] = ent.position;
            const [tx, ty] = topLeft;
            const [bx, by] = bottomRight;
            return (ex <= bx && ex >= tx && ey <= by && ey >= ty);
        });

        let data = [];
        withinSight.forEach(ent => {
            const {name, postition} = ent;
            const [withinX, withinY] = position;
            data.push({name, x: withinX, y: withinY});
        });
        return data;
    }
};
