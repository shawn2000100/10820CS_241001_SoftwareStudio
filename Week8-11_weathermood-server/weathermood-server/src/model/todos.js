const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

// listTodos
function listTodos(unaccomplishedOnly = null, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);
            
            let todos = data ? JSON.parse(data) : [];
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
            resolve(todos);
        });
    });
}

function createTodo(mood, text) {
    return new Promise((resolve, reject) => {
        const newTodo = {
            id: uuid(),
            mood: mood,
            text: text,
            ts: moment().unix(),
            doneTs: null
        };

        listTodos().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(newTodo);
            });
        });
    });
}

function accomplishTodo(id) {
    return new Promise((resolve, reject) => {
        let accomplished = null;
        listTodos().then(todos => {
            todos = todos.map(t => {
                if(t.id === id) {
                    accomplished = t;
                    t.doneTs = moment().unix();
                }
                return t;
            });

            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(accomplished);
            });
        });
    });
}

module.exports = {
    listTodos,
    createTodo,
    accomplishTodo
}
