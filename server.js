const cookieParser = require('cookie-parser');
const express=require('express');
const axios = require('axios');
const ChatController = require('./controllers/chat.controller');
const cors=require('cors');
const { Socket } = require('socket.io');
// const { Socket } = require('socket.io');
const app=express();
require('dotenv').config();
require('./config/mongoose.config')
const port=process.env.PORT

app.use(cors({credentials: true, origin: 'http://localhost:8001'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./routes/chat.route')(app);
const server =app.listen(port, () => console.log(`Listening on port: ${port}`) );

const io = require('socket.io')(server, { cors: {
    origin: "http://localhost:8001", // This should be the URL of your client
    methods: ["GET", "POST"],
    credentials: true
} });
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    // attach socket io with each request, in order to use it in api routes
    req.io = io;
    next()
})

io.on('connection', socket => {
    console.log('on-connection')
    app.set('socket', socket)
    console.log('userId: ', socket.handshake.query.userId)
    console.log('socket', socket.id)
    // add any user who connects to our server to active users list
    // send message to client that he has been successfully connected to server
    socket.on('sendMessage', async () => {
        try {
            const response = await axios.get('http://localhost:8000/allchatio');
            io.emit('receiveMessage', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('disconnection')
    })
})
