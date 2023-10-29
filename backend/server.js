const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./routes/User')
const todoRouter = require('./routes/TodoList')
const cors = require('cors');

const app = express()

app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3001',
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Add 'token' to the allowed headers
  }));

app.use('/users',userRouter)
app.use('/todo',todoRouter)


app.listen(3000,()=>{
    console.log('server started successfully on 3000');
})