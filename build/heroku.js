const app = require('../app');
const port = process.env.PORT || 5000;

const indexRouter = require('../routers/index');
const insertRouter = require('../routers/insert');
const updateRouter = require('../routers/update');
const deleteRouter = require('../routers/delete');
const notificationRouter = require('../routers/notification');

app.use('/', indexRouter);
app.use('/insert', insertRouter);
app.use('/delete', deleteRouter);
app.use('/update', updateRouter);
app.use('/send-notification', notificationRouter);

app.listen(port);
