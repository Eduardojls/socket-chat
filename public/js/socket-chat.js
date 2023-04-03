// ? --> ESTE ES EL CLIENTE
var socket = io();


    var params = new URLSearchParams( window.location.search );
    if(!params.has('name') || !params.has('room')){
        window.location = 'index.html';
        throw new Error('The name and the room are required');
    };

    var user = {
        name: params.get('name'),
        room: params.get('room'),
    };


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarAlChat', user, (resp) => {
        console.log('Users connected: ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {


    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crear-mensaje', function(mensaje) {

    console.log('Servidor:', mensaje);
});

socket.on('mensaje-privado', function(mensaje) {
    console.log(mensaje);
})

// Escuchamos cuando un usuario se desconectó del chat y se reconectó
socket.on('listar-personas', function(mensaje) {

    console.log(mensaje);
});