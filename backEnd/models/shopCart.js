module.exports = (sequelize, Datatype) => {

    const ShopCart = sequelize.define('shopcart', {
        shopCart_id: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV4,
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
        ShopCart.belongsTo(models.user, {
            foreignKey: {
                name: 'user_id',
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