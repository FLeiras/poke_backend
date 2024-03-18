import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export const Type = sequelize.define("types", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
