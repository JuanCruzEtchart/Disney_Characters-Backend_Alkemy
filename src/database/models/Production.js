module.exports = (sequelize, dataTypes) => {
  let alias = "Production";
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
      unique: { args: true, msg: "La producción ya fue creada!" },
    },
    image: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
  };
  let config = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "productions",
  };
  const Production = sequelize.define(alias, cols, config);

  Production.associate = (models) => {
    Production.belongsToMany(models.Production, {
      as: "genres",
      through: "production_genre",
      foreignKey: "production_id",
      otherKey: "genre_id",
      timestamps: false,
    });

    Production.belongsToMany(models.Production, {
      as: "characters",
      through: "character_production",
      foreignKey: "production_id",
      otherKey: "character_id",
      timestamps: false,
    });
  };

  return Production;
};
