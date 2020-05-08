import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

// Develop server URL
// const todoBaseUrl = 'http://localhost:8080/api';

// Production server URL
const todoBaseUrl = 'http://weathermood-5.us-east-1.elasticbeanstalk.com/api';

const todoKey = 'todos';

// export function listTodos(unaccomplishedOnly = false, searchText = '') {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(_listTodos(unaccomplishedOnly, searchText));
//         }, 500);
//     });
// }

// // Simulated server-side code
// function _listTodos(unaccomplishedOnly = false, searchText = '') {
//     let todoString = localStorage.getItem(todoKey);
//     let todos = todoString ? JSON.parse(todoString) : [];

//     if (unaccomplishedOnly) {
//         todos = todos.filter(t => {
//             return !t.doneTs;
//         });
//     }
//     if (searchText) {
//         todos = todos.filter(t => {
//             return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
//         });
//     }
//     return todos;
// };

// export function createTodo(mood, text) {
//     return new Promise((resolve, reject) => {
//         resolve(_createTodo(mood, text));
//     });
// }

// // Simulated server-side code
// function _createTodo(mood, text) {
//     const newTodo = {
//         id: uuid(),
//         mood: mood,
//         text: text,
//         ts: moment().unix(),
//         doneTs: null
//     };
//     const todos = [
//         newTodo,
//         ..._listTodos()
//     ];
//     localStorage.setItem(todoKey, JSON.stringify(todos));

//     return newTodo;
// }

// export function accomplishTodo(id) {
//     return new Promise((resolve, reject) => {
//         _accomplishTodo(id);
//         resolve();
//     });
// }

// // Simulated server-side code
// function _accomplishTodo(id) {
//     let todos = _listTodos();
//     for(let t of todos) {
//         if(t.id === id) {
//             t.doneTs = moment().unix();
//             break;
//         }
//     }
//     localStorage.setItem(todoKey, JSON.stringify(todos));
// }

// 0508 add
export function listTodos(unaccomplishedOnly=false, searchText='') {
    let url = `${todoBaseUrl}/todos`;
    if (searchText){
        url += `?searchText=${searchText}`;
    }
    if (unaccomplishedOnly) {
        if (searchText)
            url += `&unaccomplishedOnly=1`;
        else
            url += `?unaccomplishedOnly=1`;
    }
    
    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

// copy from createPost
export function createTodo(mood, text) {
    let url = `${todoBaseUrl}/todos`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}

export function accomplishTodo(id) {
    let url = `${todoBaseUrl}/todos/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}
