import ejs from "ejs";
import express from "express";
import { fetchPokemons } from "./database";

const app = express();

async function main() {
  const pokemons = await fetchPokemons();

  app.set("view engine", "ejs");
  app.set("port", 3000);
  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/pokemons", (req, res) => {
    console.log(pokemons);
    res.render("pokemons", { pokemons });
  });

  app.listen(app.get("port"), () => {
    console.log(`server running on http://localhost:${app.get("port")}`);
  });
}

main();
