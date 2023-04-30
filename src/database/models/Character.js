module.exports = (sequelize, dataTypes) => {
  let alias = "Character";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
      unique: { args: true, msg: "El personaje ya fue creado!" },
    },
    age: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    weight: {
      type: dataTypes.STRING(10),
      allowNull: false,
    },
    story: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
  };

  let config = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "characters",
  };
  const Character = sequelize.define(alias, cols, config);

  Character.associate = (models) => {
    Character.belongsToMany(models.Production, {
      as: "productions",
      through: "character_production",
      foreignKey: "character_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
};
