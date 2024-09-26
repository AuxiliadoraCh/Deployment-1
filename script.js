//Search data based in number and name
function buscarPokemon(contenedorNumero) {
  let inputId = `pokemonInput${contenedorNumero}`;
  let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`

  fetch(urlApi)
    .then(Response => Response.json())
    .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
    .catch(() => mostrarError(contenedorNumero))
}

function mostrarPokemon(datosPokemon, contenedorNumero) {
  let infoDivID = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivID);
  infoDiv.innerHTML = `
  <h2 class = "pk-name">${datosPokemon.name.toUpperCase()}</h2>
  <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
  <p>Id: ${datosPokemon.id} </p>
  <p>Weight: ${datosPokemon.weight / 10}Kg</p>
  <p>Height: ${datosPokemon.height / 10}m</p>
  `
}

//Error
function mostrarError(contenedorNumero) {
  let infoDivID = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivID);
  infoDiv.innerHTML = `
  <p class= "pk-ms">Pokemon no encontrado <br> Intenta con otro nombre o numero</p>
`
}

// window.onload = function () {
//   document.getElementById("pokemonInput1").value = "25";
//   buscarPokemon(1);
// }

// hala auxa qua tal? cama va ta daa? djdsjkdsjkdskjdsjkdjsjdks