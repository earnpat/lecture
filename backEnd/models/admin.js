module.exports = (sequelize, Datatype) => {

    const Admin = sequelize.define('admin', {
        admin_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        admin_username: {
            type: Datatype.STRING,
            allowNull: false
        },
        admin_password: {
            type: Datatype.STRING,
            allowNull: false
        }
    },{freezeTableName: true,
        timestamps: false
    })

    // Admin.associate = (models) => {
    //     Admin.hasMany(models.product, {
    //         foreignKey: {
    //             name: 'admin_id',
    //             allowNull: false
    //         }
    //     })
    // }

    return Admin
}