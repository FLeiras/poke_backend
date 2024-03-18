import express from "express";
import dotenv from "dotenv";
import pokeRoutes from "./routes";
import { sequelize } from "./db/sequelize";
import "./db/models/Pokemons";
import "./db/models/Types";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.get("/ping", (_req, res) => {
  console.log("Someone is here!!");
  res.send("pong");
});

app.use("/api/pokemons", pokeRoutes);

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
