const { response } = require('express');
const { request } = require('http');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        // io.emit('chat message', msg);
        console.log(msg);
    });
});

io.on('connection', (socket) => {
    socket.on('message-from-client-to-server', (msg) => {
        console.log(msg);
    })
    socket.emit('message-from-server-to-client', 'Hello World!');
});

http.listen(8080, () => {
    console.log('listening on port 8080');
});