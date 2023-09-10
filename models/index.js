const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
  as: 'posts'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
  as: 'comments'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: "CASCADE",
  as: 'comments'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: "CASCADE"
});

module.exports = {
  User,
  Post,
  Comment
};
