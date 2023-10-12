const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./routes/User')
const todoRouter = require('./routes/TodoList')

const app = express()

app.use(bodyParser.json())

app.use('/user',userRouter)
app.use('/todo',todoRouter)


app.listen(3000,'0.0.0.0',()=>{
    console.log('server started successfully on 3000');
})