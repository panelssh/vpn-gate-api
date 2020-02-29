const serverless = require('serverless-http');
const app = require('../../app');

const insertRouter = require('../../routers/insert');

app.use('/.netlify/functions/insert', insertRouter);

module.exports.handler = serverless(app);
