require("dotenv").config();


const Sequelize = require("sequelize");


const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('blog_db','angel', 'pw' ,{
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });
    console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW);

module.exports = sequelize;