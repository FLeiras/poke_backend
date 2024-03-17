import express from "express";
import dotenv from "dotenv";
import pokeRoutes from "./routes";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.get("/ping", (_req, res) => {
  console.log("Someone is here!!");
  res.send("pong");
});

app.use("/api/pokemons", pokeRoutes);

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
