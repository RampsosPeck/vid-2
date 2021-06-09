const path = require('path');
const express = require('express');
const app  = express(); 

//Settings
app.set('port', process.env.PORT || 3000)

//Static files
//console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static())

// start the server
const server = app.listen(app.get('port'), ()=> {
    console.log('Run server socket.io in', app.get('port'));
});

//Aqui usamos socket.io
const SocketIO = require('socket.io');
const io = SocketIO(server);

//WebSockets
io.on('connection', (socket) => {
    //console.log('new connection socketio.io', socket.id);

    //El evento on escucha datos
    socket.on('mimensaje', (data) => {
        //console.log(data);
        //El evento emit envia datos
        io.sockets.emit('smsserver', data);
    })

    //Escuchamos lo que esta typeando
    socket.on('typing', (data) => {
        //console.log(data);
        //Aqui todo podran ver lo que estan typeando menos yo
        socket.broadcast.emit('tyserver',data);
    })
});







