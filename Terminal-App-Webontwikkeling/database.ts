import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Pokemon, Attack } from "./interface";

dotenv.config();

const client = new MongoClient(process.env.databaseUrl || "");

export async function fetchPokemons(): Promise<Pokemon[]> {
  try {
    await client.connect();
    const database = client.db("Pokemon-API");
    const Pokémons = database.collection<Pokemon>("Pokémons");
    console.log("Connected to the database");

    return (await Pokémons?.find().toArray()) ?? [];
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
export async function fetchAttacks(): Promise<Attack[]> {
  try {
    await client.connect();
    const database = client.db("Pokemon-API");
    const Attacks = database.collection<Attack>("Attacks");
    console.log("Connected to the database");

    return (await Attacks?.find().toArray()) ?? [];
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
