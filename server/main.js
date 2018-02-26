
var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

var messages = [{
    id:1,
    text: "Hola! que tal?",
	author: "Carlos",
}];

//mildleware que trae express
app.use(express.static('public'))

app.get('/hello', (req,res)=>{
    res.status(200).send('Hellow work!')
})

//cuando reciba el msj connection de un cliente, mas el mensaje que envia
io.on('connection', (socket) =>{
    console.log('alguien se ha conectado con el socket');
   socket.emit('messages',messages)

   socket.on("new-message",(data)=>{
        messages.push(data)

    //emitir el mensaje a todos
    io.sockets.emit('messages',messages)
   })
});

server.listen(8080, () =>{
	console.log('Servidor corriendo en http://localhost:8080');
});