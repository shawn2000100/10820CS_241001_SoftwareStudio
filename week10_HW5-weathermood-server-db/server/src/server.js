require('../config.js');
const express = require('express');

const postRouter = require('./routers/posts.js');
const todoRouter = require('./routers/todos.js');
// const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger); // debug only
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
// [JC]0512: 這次好像不用設這個，Middleware做過了
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
//     next();
//   });
app.use('/api', postRouter);
app.use('/api', todoRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
    // console.log("--- testtest process.env ---");
    console.log("NODE_ENV: ", process.env.NODE_ENV);
    // console.log("DB_URL: ", process.env.DB_URL);
});
