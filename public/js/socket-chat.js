var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('The name and the room are required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    
    socket.emit('entrarAlChat', user, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderPersons(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crear-mensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
    renderMessages(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listar-personas', function(personas) {
    renderPersons(personas);
});

// Mensajes privados
socket.on('mensaje-privado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});