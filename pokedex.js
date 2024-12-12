// let randomPokemon = Math.floor(Math.random() * 1026) Commented out as unnecessary
const pokeType = document.getElementById("type");

async function getPokemon() {
   try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1026)}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    console.log(json);
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
    const pokeName = document.getElementById("pokemon");
    pokeName.textContent = json.name;
    pokeType.innerHTML = "";
    for (i=0; i < json.types.length; i++) {
    const newType = document.createElement("p")
    newType.id = "type"
    newType.textContent = `Type: ${json.types[i].type.name}`;
    pokeType.append(newType)
    }
}  catch (error) {
    console.error("Error fetching the Pokémon:", error);
}
}

const randomButtonHandler = document.getElementById("randoMon");
randomButtonHandler.addEventListener("click", getPokemon);


// getPokemon();


// types - need to be able to add second type  - loop.

//function that call the api to return a random pokemon as an object.
//store that in a variable to get info from later. might not need to do this yet.

//create a random number function