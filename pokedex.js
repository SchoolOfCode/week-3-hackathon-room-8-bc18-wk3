// let randomPokemon = Math.floor(Math.random() * 1026) Commented out as unnecessary
const pokeType = document.getElementById("type");
const randomButtonHandler = document.getElementById("randoMon");
const musicButtonHandler = document.getElementById("music");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("pokeSearch");
const audio = new Audio("pokemon-theme.mp3");
let pokeNumber = 0;
let query = "";
let pokeCry = new Audio();

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    setSearchValueHandler();
  }
});

searchButton.addEventListener("click", setSearchValueHandler);

randomButtonHandler.addEventListener("click", getPokemonHandler);
musicButtonHandler.addEventListener("click", play);

function play() {
  audio.volume = 0.08;
  audio.paused ? audio.play() : audio.pause();
}

function playCry() {
  pokeCry.volume = 0.1;
  pokeCry.play();
}

function getPokemonHandler() {
  query = Math.floor(Math.random() * 1026);
  getPokemon(query);
}

function setSearchValueHandler() {
  query = searchInput.value.toLowerCase();
  console.log(query);
  getPokemon(query);
  searchInput.value = "";
}

function upperCaseFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function getPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) alert(`${query} is not a Pokemon`);
    const json = await response.json();
    console.log(json);
    pokeCry = new Audio(json.cries.latest);
    playCry();
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
    img.style.width = "25%";
    pokeNumber = json.id;
    const pokeNameEl = document.getElementById("pokemon");
    let pokeName = upperCaseFirstLetter(json.name);
    pokeNameEl.textContent = pokeName;
    pokeType.innerHTML = "";
    getPokemonFlavour();
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

// function getQuery() {
//   const query = searchInput.value.toLowerCase();
//   console.log(query);
//   searchPokemon(query);
//   searchInput.value = "";
// }

// async function searchPokemon(query) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
//     if (!response.ok) {
//       alert(`${query} is not a Pokemon. Please try again.`);
//     }
//     const json = await response.json();
//     console.log(json);
//     pokeCry = new Audio(json.cries.latest);
//     playCry();
//     const img = document.getElementById("pokeball");
//     img.src = json.sprites.front_default;
//     const pokeNameEl = document.getElementById("pokemon");
//     let pokeName = upperCaseFirstLetter(json.name);
//     pokeNumber = json.id;
//     pokeNameEl.textContent = pokeName;
//     pokeType.innerHTML = "";
//     for (i = 0; i < json.types.length; i++) {
//       const newType = document.createElement("p");
//       newType.id = "type";
//       newType.textContent = `Type: ${upperCaseFirstLetter(
//         json.types[i].type.name
//       )}`;
//       pokeType.append(newType);
//     }
//     getPokemonFlavour();
//   } catch (error) {
//     console.error("Error fetching the Pokémon:", error);
//   }
// }
