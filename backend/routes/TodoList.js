const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/list', (request, response) => {
    const token = request.headers['token']
    try{
        const data = jwt.verify(token,'saadahmedkk') 
        const statement = `SELECT id, title, description FROM tasks where user_id ='${data.id}'`;
    
    db.query(statement, (error, tasks) => {
        const result = utils.createResult(error,tasks)
        response.send(result);
    });

    }catch(ex){
        response.status(401)
        response.send("unauthorisec")

    }
   
    
});

router.put('/tasks/:taskID', (request, response) => {
    const token = request.headers['token']
    try{
        const taskID = request.params.taskID
        const data = jwt.verify(token,'saadahmedkk') 
        const title = request.body.title;
        const description = request.body.description;
        const userID = request.body.userID
    
        const statement = `UPDATE tasks SET title = '${title}', description = '${description}' WHERE id = '${taskID}' and user_id ='${data.id}'`;
    
        db.query(statement, (error, dbResult) => {
            const result = utils.createResult(error, dbResult);
            response.send(result);
        });

    }
    catch(ex){
        response.status(401)
        response.send("unauthorisec")
    }
   
});

router.post('/add',(request, response)=>{  
    
    try{
        const token = request.headers['token']
        const data = jwt.verify(token,'saadahmedkk') 
        const title = request.body.title;
        const description = request.body.description;
        
    
        const statement = `INSERT INTO tasks (title, description, user_id) VALUES ('${title}', '${description}', '${data.id}');`
    
        db.query(statement, (error, dbResult) => {
            const result = utils.createResult(error, dbResult);
            response.send(result);
        });

    }
    catch(ex){
        response.status(401)
        response.send("unauthorisec")
    }

})


router.delete('/delete/:taskID', (request, response) => {
    try{
        const token = request.headers['token']
        const taskID = request.params.taskID
        const data = jwt.verify(token,'saadahmedkk') 
        const statement = `DELETE FROM tasks WHERE id = '${taskID}' and user_id ='${data.id}'`;
        db.query(statement, (error, dbResult) => {
            const result = utils.createResult(error, dbResult);
            response.send(result);
    });

    }catch(ex){
        response.status(401)
        response.send("unauthorisec")

    }
    });



module.exports = router

