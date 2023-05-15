const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
require('./api/helpers/init_redis');
const bodyParser = require('body-parser');
require('./api/helpers/init_mongodb');

require('./api/helpers/init_redis');
const User_routes = require('./api/routes/user');
const Product = require('./api/routes/user');
const order = require('./api/routes/user');
const loginRoute = require('./api/routes/login');
const app = express();

// Set up middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use('/users', User_routes);
app.use('/products', Product);
app.use('/orders', order);
app.use('/user', loginRoute);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});