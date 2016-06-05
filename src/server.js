import open from './controllers/door'

var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 8001,
    socketPort = 8002,
    bodyParser = require('body-parser')
    


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

io.set('transports', [ 'websocket' ]);

app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.get('/', (req, res) => {
    res.send("Hello from the garage")
})
app.get('/open', (req, res) => open.getOpen(req, res))
app.post('/open', (req, res) => open.setOpen(req, res))


app.listen(port, () => {
    console.log("Garage door server running on port: " + port)
    console.log("Websocket port: " + socketPort)
})

server.listen(socketPort)

io.on('connection', (socket) => {
    console.log("socket connected")
})
