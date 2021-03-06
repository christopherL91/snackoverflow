'use strict';

import Dungeon from '../utils/dungeon.js';

export default class {
    constructor(args) {
        const {dungeon, data} = Dungeon();
        this.entities = [];
        this.dungeon = dungeon;
        this.data = data;
    }

    getDungeon() {
        return this.dungeon;
    }

    getData() {
        return this.data;
    }

    createCharacter(name, position) {
        //keep walking sideways down until free space.
        let [x, y] = [0, 0]; // Initial position
        while(this.dungeon.walls.get([x, y])) {
            x++; y++;
        }

        this.entities.push({
            name,
            position: [x, y],
            latestMove: new Date(),
        });
    }

    getEntity(name) {
        return this.entities.filter(ent => {
            return ent.name === name;
        })[0];
    }

    forceInbounds([x,y]) {
        //let [x, y] = position;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        const [sizeX, sizeY] = this.dungeon.size;
        if (sizeX <= x) x = sizeX - 1;
        if (sizeY <= y) y = sizeY - 1;
        return [x, y];
    }

    move(name, position) {
        const character = this.getEntity(name);
        const now = new Date();
        if ((now - character.latestMove) < 500) {
            return; //fuck you.
        }
        character.latestMove = now; //update latest move
        const [dx, dy] = position;
        const [x,y] = character.position;
        const tmppos = this.forceInbounds([x + dx, y + dy]);
        //Check if we are trying to move into a wall. Then just give up.
        if (!this.dungeon.walls.get(tmppos)) {
            //We are going not going to end up in a wall
            character.position = tmppos;
        }
    }

    scan(name) {
        const character = this.getEntity(name);
        if (!character) {
            const error = new Error('Character does not exists!');
            error.status = 418;
            throw error;
        }
        const [x, y] = character.position;
        const topLeft = this.forceInbounds([x - 3, y - 3]);
        const bottomRight = this.forceInbounds([x + 3, y + 3]);
        const withinSight = this.entities.filter(ent => {
            const [ex, ey] = ent.position;
            const [tx, ty] = topLeft;
            const [bx, by] = bottomRight;
            return (ex <= bx && ex >= tx && ey <= by && ey >= ty);
        });

        let data = [];
        withinSight.forEach(ent => {
            const {name, postition} = ent;
            const [withinX, withinY] = ent.position;
            data.push({name, x: withinX, y: withinY});
        });
        return {
            postition: [x,y],
            entities: data,
            Area: this.data
        };
    }
};
