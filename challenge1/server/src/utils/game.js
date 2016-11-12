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
        this.entities.push({
            name,
            position: [10,10], //TODO: move us if we start in a wall
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
        const [dx, dy] = position;
        const [x,y] = character.position;
        character.position = this.forceInbounds([x + dx, y + dy]);
        console.log(this.entities); //Check if changed.
    }

    scan(name) {
        const character = this.getEntity(name);
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
        return data;
    }
};
