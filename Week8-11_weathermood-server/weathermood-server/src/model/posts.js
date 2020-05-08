const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-posts.json')) {
            fs.writeFileSync('data-posts.json', '');
        }

        fs.readFile('data-posts.json', 'utf8', (err, data) => {
            if (err) reject(err);
            
            let posts = data ? JSON.parse(data) : [];
            if (posts.length > 0 && searchText) {
                posts = posts.filter(p => {
                    return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(posts);
        });
    });
}

function create(mood, text) {
    return new Promise((resolve, reject) => {
        const newPost = {
            id: uuid(),
            mood: mood.charAt(0).toUpperCase() + mood.slice(1),
            text: text,
            ts: moment().unix(),
            clearVotes: 0,
            cloudsVotes: 0,
            drizzleVotes: 0,
            rainVotes: 0,
            thunderVotes: 0,
            snowVotes: 0,
            windyVotes: 0
        };

        list().then(posts => {
            posts = [
                newPost,
                ...posts
            ];
            fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(newPost);
            });
        });
    });
}

module.exports = {
    list,
    create
};
