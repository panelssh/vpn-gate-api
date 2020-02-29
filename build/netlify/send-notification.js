const serverless = require('serverless-http');
const app = require('../../app');

const notificationRouter = require('../../routers/notification');

app.use('/.netlify/functions/send-notification', notificationRouter);

module.exports.handler = serverless(app);
