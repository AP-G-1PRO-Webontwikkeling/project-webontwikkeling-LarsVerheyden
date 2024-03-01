import * as fs from 'fs';
import { Pokemon } from './interface'; 
import readlineSync from 'readline-sync'

async function readJSONFile(filename: string): Promise<any> {
  const rawData = await fetch(`https://raw.githubusercontent.com/LarsVerheyden/Terminal-App/main/Pokemon%20API/${filename}.json`);
  return rawData.json()
}
function displayData(data: Pokemon[]): void {
  console.log('- All Pokemon Data -');
  data.forEach((pokemon: Pokemon) => {
    console.log(`-${pokemon.name} (${pokemon.id})`);
    console.log(`-Description: ${pokemon.description}`);
    console.log(`-HP: ${pokemon.hp}`);
    console.log(`-Active: ${pokemon.isActive}`);
    console.log(`-Release Date: ${pokemon.releaseDate}`);
    console.log(`-Image URL: ${pokemon.imageUrl}`);
    console.log(`-Rarity: ${pokemon.rarity}`);
    console.log(`-Types: ${pokemon.types.join(', ')}`);
    console.log(`-Weakness: ${pokemon.weakness}`);
    console.log(`-Resistance: ${pokemon.resistance}`);
    console.log(`-Evolves From: ${pokemon.evolvesFrom ? pokemon.evolvesFrom : 'None'}`);
    console.log(`-Evolves To: ${pokemon.evolvesTo ? pokemon.evolvesTo : 'None'}\n`);
  });

}
function filterByID(data: Pokemon[], id: number): void {
  const filteredPokemon = data.find((pokemon: Pokemon) => pokemon.id === id);
  if (filteredPokemon) {
    console.log(`- ${filteredPokemon.name} (${filteredPokemon.id})`);
    console.log(`-Description: ${filteredPokemon.description}`);
    console.log(`-HP: ${filteredPokemon.hp}`);
    console.log(`-Active: ${filteredPokemon.isActive}`);
    console.log(`-Release Date: ${filteredPokemon.releaseDate}`);
    console.log(`-Image URL: ${filteredPokemon.imageUrl}`);
    console.log(`-Rarity: ${filteredPokemon.rarity}`);
    console.log(`-Types: ${filteredPokemon.types.join(', ')}`);
    console.log(`-Weakness: ${filteredPokemon.weakness}`);
    console.log(`-Resistance: ${filteredPokemon.resistance}`);
    console.log(`-Evolves From: ${filteredPokemon.evolvesFrom ? filteredPokemon.evolvesFrom :'None'}`);
    console.log(`-Evolves To: ${filteredPokemon.evolvesTo ? filteredPokemon.evolvesTo :'None'}\n`);
   
  } else {
    console.log('Pokemon with the provided ID was not found.');
  }
}
async function main(): Promise<void> {
  const pokemon: Pokemon[] = await readJSONFile('pokemon');
  const attacks: Pokemon[] = await readJSONFile('attacks');

  console.log('Welcome to the JSON data viewer!');
  console.log('1.View all data');
  console.log('2.Filter by ID');
  console.log('3.Exit');

  const choice = readlineSync.question('Please enter your choice: ');

  switch (choice) {
    case '1':
      displayData(pokemon);
      break;
    case '2':
      const id = readlineSync.question('Please enter the ID you want to filter by: ');
      filterByID(pokemon, parseInt(id));
      break;
    case '3':
      console.log('Exiting...');
      process.exit(0);
    default:
      console.log('Invalid choice. Please enter a valid option.');
  }
}
main();
export {}