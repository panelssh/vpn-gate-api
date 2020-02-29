const serverless = require('serverless-http');
const app = require('../../app');

const indexRouter = require('../../routers/index');

app.use('/.netlify/functions/index', indexRouter);

module.exports.handler = serverless(app);
