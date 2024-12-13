// let randomPokemon = Math.floor(Math.random() * 1026) Commented out as unnecessary
const pokeType = document.getElementById("type");
const randomButtonHandler = document.getElementById("randoMon");
randomButtonHandler.addEventListener("click", getPokemon);
let pokeNumber = 0;

async function getPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1026)}`
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
    pokeNumber = json.id;
    const pokeNameEl = document.getElementById("pokemon");
    let pokeName = upperCaseFirstLetter(json.name);
    pokeNameEl.textContent = pokeName;
    pokeType.innerHTML = "";
    for (i = 0; i < json.types.length; i++) {
      const newType = document.createElement("p");
      newType.id = "type";
      newType.textContent = `Type: ${upperCaseFirstLetter(
        json.types[i].type.name
      )}`;
      pokeType.append(newType);
    }
  } catch (error) {
    console.error("Error fetching the Pokémon:", error);
  }
  getPokemonFlavour();
}

async function getPokemonFlavour() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokeNumber}`
  );
  const json = await response.json();
  const flavorText = document.createElement("p");

  for (i = 0; i < json.flavor_text_entries.length; i++) {
    console.log(json.flavor_text_entries[i].language.name);
    if (json.flavor_text_entries[i].language.name === "en") {
      flavorText.id = "flavor";
      flavorText.textContent = json.flavor_text_entries[i].flavor_text;
      pokeType.append(flavorText);
      return;
    }
  }
}

function upperCaseFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("pokeSearch");

searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getQuery();
    }
  });

searchButton.addEventListener("click", getQuery);

function getQuery() {
  const query = searchInput.value.toLowerCase();
  console.log(query);
  searchPokemon(query);
  searchInput.value = "";
}


async function searchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      alert(`${query} is not a Pokemon. Please try again.`)
    }
    const json = await response.json();
    console.log(json);
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
    const pokeNameEl = document.getElementById("pokemon");
    let pokeName = upperCaseFirstLetter(json.name);
    pokeNumber = json.id;
    pokeNameEl.textContent = pokeName;
    pokeType.innerHTML = "";
    for (i = 0; i < json.types.length; i++) {
      const newType = document.createElement("p");
      newType.id = "type";
      newType.textContent = `Type: ${upperCaseFirstLetter(
        json.types[i].type.name
      )}`;
      pokeType.append(newType);
    }
    getPokemonFlavour();
  } catch (error) {
    console.error("Error fetching the Pokémon:", error);
  }
}
