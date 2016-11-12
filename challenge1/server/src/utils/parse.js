'use strict';

export default (game) => (message) => {
    console.log(message);
    const {command, name} = message;
    console.log(command);
    switch(command) {
        case 'move':
            const {dx, dy} = message;
            game.move({name, position: [dx, dy]});
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
