import * as fs from 'fs';
import { Pokemon } from './interface'; 
import readlineSync from 'readline-sync'

function readJSONFile(filename: string): any {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData.toString());
}
function displayData(data: Pokemon[]): void {
  console.log('- All Pokemon Data -');
  data.forEach((pokemon: Pokemon) => {
    console.log(`- ${pokemon.name} (${pokemon.id})`);
    console.log(`  - Description: ${pokemon.description}`);
    console.log(`  - HP: ${pokemon.hp}`);
    console.log(`  - Active: ${pokemon.isActive}`);
    // Voeg meer eigenschappen toe zoals nodig
    console.log('');
  });
}

// Functie om data te filteren op ID
function filterByID(data: Pokemon[], id: number): void {
  const filteredPokemon = data.find((pokemon: Pokemon) => pokemon.id === id);
  if (filteredPokemon) {
    console.log(`- ${filteredPokemon.name} (${filteredPokemon.id})`);
    console.log(`  - Description: ${filteredPokemon.description}`);
    console.log(`  - HP: ${filteredPokemon.hp}`);
    console.log(`  - Active: ${filteredPokemon.isActive}`);
    // Voeg meer eigenschappen toe zoals nodig
  } else {
    console.log('Pokemon with the provided ID was not found.');
  }
}

// Hoofdfunctie
function main(): void {
  const data: Pokemon[] = readJSONFile('pokemon.json');

  console.log('Welcome to the JSON data viewer!');
  console.log('1. View all data');
  console.log('2. Filter by ID');
  console.log('3. Exit');

  const choice = readlineSync.question('Please enter your choice: ');

  switch (choice) {
    case '1':
      displayData(data);
      break;
    case '2':
      const id = readlineSync.question('Please enter the ID you want to filter by: ');
      filterByID(data, parseInt(id));
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