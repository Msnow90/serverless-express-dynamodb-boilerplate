const express                       = require("express");
const serverless                    = require("serverless-http");
const expressSanitizer              = require('express-sanitizer');
const bodyParser                    = require("body-parser");


const app = express();

// middleware
app.use(expressSanitizer());

// service routes
const userServiceRoutes = require('./api/userService/users');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'You did it!' })
})

app.use('/api/user', userServiceRoutes);

app.get('*', (req, res, next) => {
    res.status(404).json({ message: 'Failed to fetch resource.' });
})


module.exports.handler = serverless(app);

