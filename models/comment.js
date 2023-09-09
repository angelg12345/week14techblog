const { Model, DataTypes } = require("sequelize");
const sequelize = require ("../config/connection");

class Comment extends Model {}

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          commentBody: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          DateCreated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id'
            }
          },
          postID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Post',
              key: 'id'
            },
          }, 
         },
         {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: "post",
          
         });

    
    return Comment;
}

module.exports = Comment