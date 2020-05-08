const express = require('express');
const bodyParser = require('body-parser');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());


// List Todos
router.get('/todos', function(req, res, next) {
    todoModel.listTodos(req.query.unaccomplishedOnly, req.query.searchText).then(todos => {
        res.json(todos);
    }).catch(next);
});

// Create Todo
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodo(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
});

// Accomplish Todo
router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;
    todoModel.accomplishTodo(id).then(todo => {
        res.json(todo);
    }).catch(next);
});

module.exports = router;
