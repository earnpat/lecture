module.exports = (sequelize, Datatype) => {

    const User = sequelize.define('user', {
        user_id: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        username: {
            type: Datatype.STRING,
            allowNull: false
        },
        password: {
            type: Datatype.STRING,
            allowNull: false
        },
        firstname: {
            type: Datatype.STRING,
        },
        lastname: {
            type: Datatype.STRING,
        },
        birth: {
            type: Datatype.STRING,
        },
        email: {
            type: Datatype.STRING,
        },
        address: {
            type: Datatype.STRING,
        },
        tel: {
            type: Datatype.INTEGER,
        },
        role: {
            type: Datatype.ENUM("admin", "user")
        }
    }
    , {
        freezeTableName: true,
        timestamps: false
    })

    User.associate = (models) => {
        User.hasOne(models.shopcart, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })
    }

    return User
}