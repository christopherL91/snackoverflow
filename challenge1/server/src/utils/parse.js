'use strict';

export default (game) => (message) => {
    const {command, name} = message;
    switch(command) {
        case 'move':
            const {dx, dy} = message;
            game.move(name, [dx, dy]);
            break;
        case 'create':
            game.createCharacter(message.name);
        case 'scan':
            return game.scan(name);
            break;
        default:
            throw new Error('Invalid command');
    }
};
