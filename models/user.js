module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

User.associate = (models) => {
    User.hasMany(models.Post, {
        foreignKey: 'userID',
        as: 'posts'
    });
};

}