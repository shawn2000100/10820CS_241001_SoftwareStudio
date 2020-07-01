import axios from 'axios';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const todoKey = 'todos';

export function listTodos(unaccomplishedOnly = false, searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listTodos(unaccomplishedOnly, searchText));
        }, 500);
    });
}

// Simulated server-side code
function _listTodos(unaccomplishedOnly = false, searchText = '') {
    let todoString = localStorage.getItem(todoKey);
    let todos = todoString ? JSON.parse(todoString) : [];

    if (unaccomplishedOnly) {
        todos = todos.filter(t => {
            return !t.doneTs;
        });
    }
    if (searchText) {
        todos = todos.filter(t => {
            return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
    }
    return todos;
};

export function createTodo(mood, text) {
    return new Promise((resolve, reject) => {
        resolve(_createTodo(mood, text));
    });
}

// Simulated server-side code
function _createTodo(mood, text) {
    const newTodo = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        doneTs: null
    };
    const todos = [
        newTodo,
        ..._listTodos()
    ];
    localStorage.setItem(todoKey, JSON.stringify(todos));

    return newTodo;
}

export function accomplishTodo(id) {
    return new Promise((resolve, reject) => {
        _accomplishTodo(id);
        resolve();
    });
}

// Simulated server-side code
function _accomplishTodo(id) {
    let todos = _listTodos();
    for(let t of todos) {
        if(t.id === id) {
            t.doneTs = moment().unix();
            break;
        }
    }
    localStorage.setItem(todoKey, JSON.stringify(todos));
}
