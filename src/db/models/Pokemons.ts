import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

import { Types } from "./Types";
import { PokeTypes } from "../../interfaces/pokemon";

class Pokemodel extends Model {
  name!: string;
  hp!: number;
  attack!: number;
  image!: string;
  type!: PokeTypes;
}

export const Pokemons = Pokemodel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
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

Pokemons.hasMany(Types, { foreignKey: "pokemon_type", sourceKey: "id" });
Types.belongsTo(Pokemons, { foreignKey: "pokemon_type", targetKey: "id" });
