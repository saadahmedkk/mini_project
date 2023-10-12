const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

router.get('/list', (request, response) => {
    const userID = request.body.userID
    const statement = `SELECT id, title, description FROM tasks where user_id ='${userID}'`;
    
    db.query(statement, (error, tasks) => {
        const result = utils.createResult(error,tasks)
        response.send(result);
    });
});

router.put('/tasks/:taskID', (request, response) => {
    const taskID = request.params.taskID;
    const title = request.body.title;
    const description = request.body.description;
    const userID = request.body.userID

    const statement = `UPDATE tasks SET title = '${title}', description = '${description}' WHERE id = '${taskID}' and user_id ='${userID}'`;

    db.query(statement, (error, dbResult) => {
        const result = utils.createResult(error, dbResult);
        response.send(result);
    });
});

router.post('/add',(request, response)=>{
    
    const title = request.body.title
    const description = request.body.description
    const userID = request.body.userID

    const statement = `INSERT INTO tasks (title, description, user_id) VALUES ('${title}', '${description}', '${userID}');
    `
    db.query(statement,(error,dbResult)=>{
        const result = utils.createResult(error,dbResult)
        response.send(result)
    })

})


router.delete('/delete/:id', (request, response) => {
    const taskId = request.params.id
    const userID = request.body.userID

    const statement = `DELETE FROM tasks WHERE id = '${taskId}' and user_id ='${userID}'`;
    db.query(statement, (error, dbResult) => {
        const result = utils.createResult(error, dbResult);
        response.send(result);
    });
});


module.exports = router