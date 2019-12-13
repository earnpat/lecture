module.exports = (sequelize, Datatype) => {

    const Order = sequelize.define('order', {
        order_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        payment: {
            type: Datatype.STRING,
            allowNull: false
        },
        shipping: {
            type: Datatype.STRING,
            allowNull: false
        }
    },{freezeTableName: true,
        timestamps: false
    })

    Order.associate = (models) => {
        Order.belongsTo(models.shopcart, {
            foreignKey: {
                name: 'shopCart_id',
                allowNull: false
            }
        })
    }

    return Order
}