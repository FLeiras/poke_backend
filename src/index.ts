import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db/sequelize";

import "./db/models/Types";
import "./db/models/Pokemons";
import pokeRoutes from "./routes";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.get("/ping", (_req, res) => {
  console.log("Someone is here!!");
  res.send("pong");
});

app.use(express.json());

app.use("/api", pokeRoutes);

async function main() {
  try {
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`Server running in port: ${port}`);
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();
