module.exports = (sequelize, Datatype) => {

    const ShopCart = sequelize.define('shopcart', {
        shopCart_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        amount: {
            type: Datatype.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: Datatype.INTEGER,
            allowNull: false
        }
    },{freezeTableName: true,
        timestamps: false
    })

    ShopCart.associate = (models) => {
        ShopCart.hasOne(models.order, {
            foreignKey: {
                name: 'shopCart_id',
                allowNull: false
            }
        })
        ShopCart.belongsTo(models.customer, {
            foreignKey: {
                name: 'customer_id',
                allowNull: false
            }
        })
        ShopCart.belongsTo(models.product, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            }
        })
    }

    return ShopCart
}