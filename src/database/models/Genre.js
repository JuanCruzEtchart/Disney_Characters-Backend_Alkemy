module.exports = (sequelize, dataTypes) => {
  let alias = "Genre";
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
      unique: { args: true, msg: "El género ya fue creado!" },
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
    tableName: "genres",
  };
  const Genre = sequelize.define(alias, cols, config);

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Production, {
      as: "productions",
      through: "production_genre",
      foreignKey: "genre_id",
      otherKey: "production_id",
      timestamps: false,
    });
  };
  
  return Genre
};
