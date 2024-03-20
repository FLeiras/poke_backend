"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemons = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const Types_1 = require("./Types");
class Pokemodel extends sequelize_1.Model {
}
exports.Pokemons = Pokemodel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    hp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    attack: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "pokemons",
});
exports.Pokemons.hasMany(Types_1.Types, { foreignKey: "pokemon_type", sourceKey: "id" });
Types_1.Types.belongsTo(exports.Pokemons, { foreignKey: "pokemon_type", targetKey: "id" });
