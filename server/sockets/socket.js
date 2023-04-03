const { io } = require('../server');
const { Users } = require('../classes/user');
const { createMessage } = require('../utils/utils');

const users = new Users();


// Este es el servidor
io.on('connection', (client) => {

    
    client.on('entrarAlChat', (data, callback) => {

        if (!callback) return;

        if( !data.name || !data.room ){
            return callback({
                error: true,
                msg: "The name and the room are mandatory"
            });
        };

        client.join(data.room);

        users.setUser(client.id, data.name, data.room);
        const personsByRoom = users.getUsersByRoom(data.room);
        client.broadcast.to(data.room).emit('listar-personas', personsByRoom);
        callback(personsByRoom);
    });

    client.on('disconnect', () => {

        const deletedUser = users.deleteUser(client.id);
        client.broadcast.to(deletedUser.room).emit('crear-mensaje', createMessage('Administrator', `${deletedUser.name} has left the chat`));
        client.broadcast.to(deletedUser.room).emit('listar-personas', users.getUsersByRoom(deletedUser.room));
    });

    client.on('crear-mensaje', (data) => {

        let person = users.getUser(client.id);
        let message = createMessage(person.name, data.message);
        client.emit('crear-mensaje', message);
        client.broadcast.to(person.room).emit('crear-mensaje', message);
    });

    client.on('mensaje-privado', (data) => {

        let person = users.getUser(client.id);
        let message = createMessage(person.name, data.message);

        console.log(data, message );
        client.broadcast.to(data.to).emit('mensaje-privado', message);
    });

});