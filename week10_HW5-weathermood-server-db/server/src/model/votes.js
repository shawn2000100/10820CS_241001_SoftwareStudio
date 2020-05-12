if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}
const postModel = require('./posts.js');

function create(postId, mood) {
    const sql = `
        UPDATE posts
        SET $2:name = $2:name + 1
        WHERE id = $1
        RETURNING *
    `;
    return db.one(sql, [postId, mood.toLowerCase() + 'Votes']);
}

module.exports = {
    create
};
