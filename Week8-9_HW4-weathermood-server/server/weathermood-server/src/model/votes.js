const fs = require('fs');

const postModel = require('./posts.js');

function create(postId, mood) {
    return new Promise((resolve, reject) => {
        let votedPost = null;
        postModel.list().then(posts => {
            posts = posts.map(p => {
                if (p.id === postId) {
                    votedPost = p;
                    p[mood.toLowerCase() + 'Votes']++;
                }
                return p;
            });

            fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(votedPost);
            });
        });
    });
}

module.exports = {
    create
};
