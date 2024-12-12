async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
    const json = await response.json();
    console.log(json);
    const img = document.getElementById("pokeball");
    img.src = json.sprites.front_default;
    const pokeName = document.getElementById("pokemon");
    pokeName.textContent = json.name;
    const pokeType = document.getElementById("type");
    pokeType.textContent = `Type: ${json.types[0].type.name}`;
}

getPokemon();

// types - need to be able to add second type  - loop.

//function that call the api to return a random pokemon as an object.
//store that in a variable to get info from later. might not need to do this yet.

//create a random number function