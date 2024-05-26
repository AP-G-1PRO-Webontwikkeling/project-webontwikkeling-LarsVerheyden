import ejs from "ejs";
import express from "express";
import { fetchAttacks, fetchPokemons } from "./database";

const app = express();

async function main() {
  const pokemons = await fetchPokemons();
  const attacks = await fetchAttacks();

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

  app.get("/pokemons/:name", (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const pokemon = pokemons.find((p) => p.name.toLowerCase() === pokemonName);
    if (pokemon) {
      res.render("pokemonDetail", { pokemon });
    } else {
      res.status(404).send("Pokémon not found");
    }
  });

  app.get("/pokemonAttacks", (req, res) => {
    console.log(attacks);
    res.render("partials/pokemonAttacks", { attacks: attacks });
  });

  app.listen(app.get("port"), () => {
    console.log(`server running on http://localhost:${app.get("port")}`);
  });
}

main();
