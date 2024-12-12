// let randomPokemon = Math.floor(Math.random() * 1026) Commented out as unnecessary
const pokeType = document.getElementById("type");
const randomButtonHandler = document.getElementById("randoMon");
randomButtonHandler.addEventListener("click", getPokemon);

async function getPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1026)}`
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    console.log(json);
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
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
}

function upperCaseFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

document.getElementById("search").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    const query = event.target.value.toLowerCase();
    console.log(query);
    searchPokemon(query);
    event.target.value = "";
  }
})

async function searchPokemon(query) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const json = await response.json();
  console.log(json);
  const img = document.getElementById("pokeball");
  img.src = json.sprites.front_default;
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
}