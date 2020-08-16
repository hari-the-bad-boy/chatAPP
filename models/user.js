
module.exports = (sequelize, DataTypes) => {
    var User =  sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },logged_in: {
            type: DataTypes.BOOLEAN,
            default: true
        }
    },
    {
        freezeTableName: true,
        tableName: 'user_tbl',
    });

    User.associate = (models) => {
        User.hasMany(models.Text, { foreignKey: 'userId', sourceKey: 'id' });
        User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id' })
    };
    return User
}
