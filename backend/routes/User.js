const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.get('/list',(request,response)=>{ 
    const statement = `select * from users`
    db.query(statement,(error,dbResult)=>{
        const result = utils.createResult(error,dbResult)
        response.send(result)
    }) 
})

router.post('/signup',(request, response)=>{
    const username = request.body.username
    const password = request.body.password
    const encryptPassword = crypto.SHA256(password)
    const statement = `INSERT INTO users (username, password) VALUES ('${username}','${encryptPassword}')`
    db.query(statement,(error,dbResult)=>{
        const result = utils.createResult(error,dbResult)
        response.send(result)
    })

})
router.post('/signin',(request, response)=>{
    const username = request.body.username
    const password = request.body.password
    const encryptPassword = crypto.SHA256(password)
    const statement = `Select * from users where username = '${username}' and password ='${encryptPassword}'`
    db.query(statement,(error,users)=>{
        const result ={status:'',data:''}
        if(users.length == 0){
            result['status']='error'
            result['error']='user doesnot exist'
        }
        else{
            const user = users[0]
            const token = jwt.sign({id: user['id']},'saadahmedkk')
            result['status']='success'
            result['data']={
                
                username:user['username'],
                password:user['password'],
                token:token
            }

        }
        response.send(result)
    })

})

router.get('/profile', (request, response) => {
    const token = request.headers['token']
   
    try{
        const data = jwt.verify(token,'saadahmedkk') 
        const statement = `SELECT * FROM users WHERE id = ${data.id}`;
        db.query(statement, (error, users) => {
        const result = { status: '' };
        if (users.length === 0) {
            result['status'] = 'error';
            result['error'] = 'User does not exist';
        } else {
            const user = users[0];
            result['status'] = 'success';
            result['data'] = {
                id: user['id'],
                username: user['username'],
                password: user['password']
            };
        }
        response.send(result);
    });
   
    }
    catch(ex){
       
        response.status(401)
        response.send('not authorized')
    }
    
});

module.exports = router