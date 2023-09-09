const { sequelize, Datatypes} = require("sequelize");
const sequelize = new sequelize(process.env.JAWSDB_URL);

const User = require('./user')(sequelize, Datatypes);
const Post = require('./post')(sequelize, Datatypes);
const Comment = require('./comment')(sequelize, Datatypes);

User.hasMany(Post, {
    foreignKey: 'userID',
    onDelete: "CASCADE",
    as: 'posts'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: "CASCADE",
    as: 'comments'
  });
  
  Post.belongsTo(User, {
    foreignKey: 'userID'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'postID',
    OnDelete: "CASCADE",
    as: 'comments'
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'userID'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'postID',
    onDelete: "CASCADE"
  });
  
  module.exports = {
    User,
    Post,
    Comment
  };
