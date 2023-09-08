const express = require('express')
const exphbs = require ('express-handlebars')
const session = require('express-session');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(session ({
    secret: 'this-is-mykey',
    resave: true,
    saveUninitialized: true
}));

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});