var db = require("../models");

module.exports = (sequelize, DataTypes) => {
    var Post =  sequelize.define('Post', {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },caption: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { notEmpty: true }
        },userId: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' },
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        tableName: 'post_tbl',
    });

    Post.associate = (models) => {
        Post.hasMany(models.Comment, { foreignKey: 'textId', sourceKey: 'id' })
    };
    return Post
}
