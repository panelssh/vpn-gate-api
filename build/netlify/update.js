const serverless = require('serverless-http');
const app = require('../../app');

const updateRouter = require('../../routers/update');

app.use('/.netlify/functions/update', updateRouter);

module.exports.handler = serverless(app);
