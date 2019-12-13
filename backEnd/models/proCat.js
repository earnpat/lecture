module.exports = (sequelize, Datatype) => {

    const ProCat = sequelize.define('procat', {
        proCat_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        proCat_name: {
            type: Datatype.STRING,
            allowNull: true
        }
    },{freezeTableName: true,
        timestamps: false
    })

    ProCat.associate = (models) => {
        ProCat.hasOne(models.product, {
            foreignKey: {
                name: 'proCat_id',
                allowNull: false
            }
        })
    }

    return ProCat
}