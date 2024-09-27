let savedPokemons = [];

function buscarPokemon(contenedorNumero) {
  let inputId = `pokemonInput${contenedorNumero}`;
  let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  fetch(urlApi)
    .then(response => response.json())
    .then(datosPokemon => {
      mostrarPokemon(datosPokemon, contenedorNumero);
      guardarPokemon(datosPokemon);
    })
    .catch(() => mostrarError(contenedorNumero));
}

function mostrarPokemon(datosPokemon, contenedorNumero) {
  let infoDivID = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivID);
  infoDiv.innerHTML = `
    <h2 class="pk-name">${datosPokemon.name.toUpperCase()}</h2>
    <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
    <p>Id: ${datosPokemon.id}</p>
    <p>Weight: ${datosPokemon.weight / 10} Kg</p>
    <p>Height: ${datosPokemon.height / 10} m</p>
  `;
}

function mostrarError(contenedorNumero) {
  let infoDivID = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivID);
  infoDiv.innerHTML = `<p class="pk-ms">Pokémon no encontrado <br> Intenta con otro nombre o número</p>`;
}

function guardarPokemon(datosPokemon) {
  // Verifica si el Pokémon ya fue guardado
  if (!savedPokemons.find(pokemon => pokemon.id === datosPokemon.id)) {
    savedPokemons.push(datosPokemon);
    mostrarPokemonsGuardados();
  }
}

function mostrarPokemonsGuardados() {
  let pokemonListDiv = document.getElementById("pokemonList");
  pokemonListDiv.innerHTML = "";

  // Ordenar los Pokémon por ID
  savedPokemons.sort((a, b) => a.id - b.id);

  savedPokemons.forEach(pokemon => {
    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
      <h3>${pokemon.name.toUpperCase()}</h3>
      <img class="pk-img" src="${pokemon.sprites.other["official-artwork"].front_default}">
      <p>ID: ${pokemon.id}</p>
      <p>Peso: ${pokemon.weight / 10} Kg</p>
      <p>Altura: ${pokemon.height / 10} m</p>
      <button class="remove-btn" onclick="eliminarPokemon(${pokemon.id})">Eliminar</button>
    `;
    pokemonListDiv.appendChild(pokemonCard);
  });
}

function eliminarPokemon(pokemonId) {
  savedPokemons = savedPokemons.filter(pokemon => pokemon.id !== pokemonId);
  mostrarPokemonsGuardados();
}


// window.onload = function () {
//   document.getElementById("pokemonInput1").value = "25";
//   buscarPokemon(1);
// }