const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
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

    const statement = `INSERT INTO users (username, password) VALUES ('${username}','${password}')`
    db.query(statement,(error,dbResult)=>{
        const result = utils.createResult(error,dbResult)
        response.send(result)
    })

})
router.post('/signin',(request, response)=>{
    const username = request.body.username
    const password = request.body.password

    const statement = `Select * from users where username = '${username}' and password ='${password}'`
    db.query(statement,(error,users)=>{
        const result ={status:''}
        if(users.length == 0){
            result['status']='error'
            result['error']='user doesnot exist'
        }
        else{
            const user = users[0]
            result['status']='success'
            result['data']={
                id:user['id'],
                username:user['username'],
                password:user['password']
            }

        }
        response.send(result)
    })

})

router.get('/:id', (request, response) => {
    const userId = request.params.id;

    const statement = `SELECT * FROM users WHERE id = ${userId}`;
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
});

module.exports = router