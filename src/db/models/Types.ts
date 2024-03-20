import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

class Type extends Model {}

export const Types = Type.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "types",
  }
);
