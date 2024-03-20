import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});
