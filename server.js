// Importar las dependencias
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var name1 = "Chat1"
var name2 = "Chat2"
var userimage1 = ""
var userimage2 = ""
function hora() {
    return new Date().toLocaleTimeString();
}

// Ruta para el archivo HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// Escuchar la conexión de Socket.IO
io.on('connection', function (socket) {
    console.log('Usuario conectado');

    socket.on('update user 1', function(name , image1){
        name1 = name
        userimage1 = image1
        io.emit('update user 1', name1,userimage1)
    })
    socket.on('update user 2', function(name2 , image2){
        name2 = name2
        userimage2 = image2
        io.emit('update user 2', name2,userimage2)
    })


    // Escuchar el evento 'chat message 1' para el chat 1
    socket.on('chat message 1', function (msg) {
        console.log('Mensaje de '+name1+': ' + msg);
        io.emit('chat message 1', name1, msg, hora());
    });


    // Escuchar el evento 'chat message 2' para el chat 2
    socket.on('chat message 2', function (msg) {
        console.log('Mensaje de '+name2+': ' + msg);
        io.emit('chat message 2', name2, msg, hora());
    });


    // Escuchar la desconexión del usuario
    socket.on('disconnect', function () {
        console.log('Usuario desconectado');
    });
});


// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function () {
    console.log('Servidor escuchando en http://localhost:3000');
});
