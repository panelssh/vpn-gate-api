const serverless = require('serverless-http');
const app = require('../../app');

const deleteRouter = require('../../routers/delete');

app.use('/.netlify/functions/delete', deleteRouter);

module.exports.handler = serverless(app);
