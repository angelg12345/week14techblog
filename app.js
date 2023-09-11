
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize  = require("./config/connection")
const routes = require("./controllers")
const app = express()
const path = require("path");
const helpers = require("./utils/helpers")



const hbs = exphbs.create({ helpers, });
app.use(
  session({
    secret: 'this-is-mykey',
    resave: true,
    saveUninitialized: true
  })
);

// Set the view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
// Set up session middleware




app.use(routes)


sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');


  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
