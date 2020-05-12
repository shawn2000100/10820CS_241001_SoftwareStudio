const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// TodoList
router.get('/todos', function(req, res, next){
    const {searchText, start} = req.query;
    let unaccomplishedOnly;
    if (req.query.unaccomplishedOnly === 'true')
        unaccomplishedOnly = true;
    else
        unaccomplishedOnly = false;
    todoModel.listTodos(unaccomplishedOnly,searchText,start).then(todos => {
        res.json(todos);
    }).catch(next);
});

// CreatTodo
router.post('/todos',function(req, res, next){
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodo(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
})

// Accomplish
router.post('/todos/:id', function(req, res, next){
    const {id} = req.params;
    if(!id){
        const err = new Error('Todo ID is required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplishTodo(id).then(todo => {
        res.json(todo);
    }).catch(next);
})

module.exports = router;
