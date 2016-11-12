'use strict';

export default (game) => (message) => {
    const {command, name} = message;
    switch(command) {
        case 'create':
            game.createCharacter(message.name);
            break;
        case 'move':
            const {dx, dy} = message;
            game.move({name, position: [dx, dy]});
            break;
        case 'scan':
            game.scan(name);
            break;
        default:
        throw new Error('Invalid command');
    }
};
