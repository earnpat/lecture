module.exports = (sequelize, Datatype) => {

    const Product = sequelize.define('product', {
        product_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        product_name: {
            type: Datatype.STRING,
            allowNull: false
        },
        image: {
            type: Datatype.STRING,
            allowNull: true
        },
        price: {
            type: Datatype.INTEGER,
            allowNull: false
        },
        detail: {
            type: Datatype.TEXT,
            allowNull: true
        }
    },{freezeTableName: true,
        timestamps: false
    })

    Product.associate = (models) => {
        // Product.belongsTo(models.admin, {
        //     foreignKey: {
        //         name: 'admin_id',
        //         allowNull: false
        //     }
        // })
        Product.belongsTo(models.procat, {
            foreignKey: {
                name: 'proCat_id',
                allowNull: false
            }
        })
        Product.hasOne(models.shopcart, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            }
        })
    }

    return Product
}