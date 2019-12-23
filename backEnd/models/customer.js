module.exports = (sequelize, Datatype) => {

    const Customer = sequelize.define('customer', {
        customer_id: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        customer_username: {
            type: Datatype.STRING,
            allowNull: false
        },
        customer_password: {
            type: Datatype.STRING,
            allowNull: false
        },
        firstname: {
            type: Datatype.STRING,
            allowNull: true
        },
        lastname: {
            type: Datatype.STRING,
            allowNull: true
        },
        birth: {
            type: Datatype.STRING,
            allowNull: false
        },
        email: {
            type: Datatype.STRING,
            allowNull: false
        },
        address: {
            type: Datatype.STRING,
            allowNull: false
        },
        tel: {
            type: Datatype.INTEGER,
            allowNull: false
        }
    },{freezeTableName: true,
        timestamps: false
    })

    Customer.associate = (models) => {
        Customer.hasOne(models.shopcart, {
            foreignKey: {
                name: 'customer_id',
                allowNull: false}
        })
    }

    return Customer
}