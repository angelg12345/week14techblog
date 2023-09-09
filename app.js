const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();


const helpers = {

  };



const hbs = exphbs.create({ helpers });

// Set the view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// Set up session middleware
app.use(
  session({
    secret: 'this-is-mykey',
    resave: true,
    saveUninitialized: true
  })
);


const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
