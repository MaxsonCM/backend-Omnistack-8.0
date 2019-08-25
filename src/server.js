const dotenv = require ('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

dotenv.config ()

const server = express()

mongoose.connect('mongodb+srv://' + process.env.USER +':' + process.env.PASSWORD + '@' + process.env.HOST + '?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

server.use(express.json())
server.use(routes)

server.listen(process.env.PORT)