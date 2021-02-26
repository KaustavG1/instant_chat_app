const { response } = require('express');
const { request } = require('http');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
    // console.log("New connection");
});

// io.on('connection', (socket) => {
//     console.log('New user connected');
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });

io.on('connection', (socket) => {
    //console.log("Client connected!");
    socket.on('message-from-client-to-server', (msg) => {
        console.log(msg);
    })
    socket.emit('message-from-server-to-client', 'Hello World!');
});

http.listen(8080, () => {
    console.log('listening on port 8080');
});