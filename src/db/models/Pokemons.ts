import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { Type } from "./Types";

class Pokemon extends Model {}

export const Pokemons = Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "pokemons",
  }
);

Pokemons.hasMany(Type, { foreignKey: "pokemon_type", sourceKey: "id" });
Type.belongsTo(Pokemons, { foreignKey: "pokemon_type", targetKey: "id" });
