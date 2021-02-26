const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');

// Connect to DB
mongoose.connect("mongodb://localhost:27017/chatDB").then(() => console.log('Connection Successful'));

// Serve UI to client
app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

// Create DB Schema
const chatDBSchema = new mongoose.Schema({
    message: String
});

// Create Schema Model
const chatModel = mongoose.model('client_replies', chatDBSchema);

// Initiate socket connection, broadcast 'Hello World' and listen for incomming massages; eventually save incomming messages to client_replies collection of chatDB database
io.on('connection', (socket) => {
    socket.on('message-from-client-to-server', (msg) => {
        const messageObj = new chatModel({
            message: msg
        });
        messageObj.save().then(doc => {console.log(doc)}).catch(err => {console.log('ERROR', err)});
    })
    socket.emit('message-from-server-to-client', 'Hello World!');
});

// Listen for connections on port 8080
http.listen(8080, () => {
    console.log('listening on port 8080');
});