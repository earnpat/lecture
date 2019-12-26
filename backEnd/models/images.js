module.exports = (sequelize, Datatype) => {

    const Images = sequelize.define('images', {
        images_id: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        image_url_1: {
            type: Datatype.STRING,
            allowNull: false
        },
        image_url_2: {
            type: Datatype.STRING,
            allowNull: true
        },
        image_url_3: {
            type: Datatype.STRING,
            allowNull: true
        },
        image_url_4: {
            type: Datatype.STRING,
            allowNull: true
        }
    },{freezeTableName: true,
        timestamps: false
    })

    Images.associate = (models) => {
        // Product.belongsTo(models.admin, {
        //     foreignKey: {
        //         name: 'admin_id',
        //         allowNull: false
        //     }
        // })
        Images.hasOne(models.product, {
            foreignKey: {
                name: 'images_id',
                allowNull: false
            }
        })
    }

    return Images
}