"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Type extends sequelize_1.Model {
}
exports.Types = Type.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "types",
});
