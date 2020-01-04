module.exports = (sequelize, Datatype) => {
  const Product = sequelize.define(
    "product",
    {
      product_id: {
        type: Datatype.UUID,
        defaultValue: Datatype.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      product_name: {
        type: Datatype.STRING,
        allowNull: false
      },
      price: {
        type: Datatype.INTEGER,
        allowNull: false
      },
      detail: {
        type: Datatype.TEXT,
        allowNull: true
      },
      category: {
        type: Datatype.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
      // timestamps: false
    }
  );

  Product.associate = models => {
    Product.hasOne(models.shopcart, {
      foreignKey: {
        name: "product_id",
        allowNull: false
      }
    });
    Product.belongsTo(models.images, {
      foreignKey: {
        name: "images_id",
        allowNull: false
      }
    });
  };

  return Product;
};
