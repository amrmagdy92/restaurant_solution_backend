const express      = require('express');
const cookieParser = require('cookie-parser');
const mongoose     = require('mongoose');

const mongoURI = require('./db.js');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoURI);

const index_route = require('./routes/index');
const user_route = require('./routes/user_route');
const ingredient_route = require('./routes/ingredient_route');
const menu_route = require('./routes/menu_route');
const dine_in_route = require('./routes/dine_in_route');
const delivery_route = require('./routes/delivery_route');
const restaurant_route = require('./routes/restaurant_route');
const auth_route = require('./routes/auth_route');
const customer_route = require('./routes/customer_route');

const auth = require("./utility/auth")();
const app  = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.initialize());

app.use('/', index_route);
app.use('/users', user_route);
app.use('/ingredients', ingredient_route);
app.use('/products', menu_route);
app.use('/dinein', dine_in_route);
app.use('/delivery', delivery_route);
app.use('/restaurants', restaurant_route);
app.use('/auth', auth_route);
app.use('/customers', customer_route);

module.exports = app;