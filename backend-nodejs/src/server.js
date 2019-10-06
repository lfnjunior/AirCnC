const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const PORT_LISTENING = 3333
const DB_HOST = 'localhost'
const DB_PORT = 27017

//Configuração para estabelecer conexão websocket
const app = express()
const server = http.Server(app)
const io = socketio(server)

//Configuração para conexão com MongoDB
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/aircnc`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query 
  connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io 
  req.connectedUsers = connectedUsers
  return next()//para retornar o fluxo normal
})

app.use(cors())//Configuração para mermissão de origens de requisição
app.use(express.json())//Definito formato Json para troca de mensagens da API
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))//Rota definida para ter acesso as imagens dentro da ppasta upload
app.use(routes)

server.listen(PORT_LISTENING)