const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

let offset = 0;
const limit = 10;
const maxRecords = 151;

/*
const offset = 0;
const limit = 10;

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limite=${limit}`;
*/

/*
fetch(url)
    .then(function (response) {
        return response
            .json();
    }).then(function (jsonBody) {
        console.log(jsonBody);
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log('Requisição concluída!');
    });
*/

/*
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`);
}
*/


function convertPokemonToLi(pokemon) {
    /*
    return `
        <li class="pokemon">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}    
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
         </li>
    `;
    */
   
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}    
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}


/*
fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonToLi(pokemon);
            
            
        }
    })
    .catch(error => console.log(error));
*/

/*
pokeApi.getPokemons()
    .then(pokemons => {
        const listItems = [];

        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            // pokemonList.innerHTML += convertPokemonToLi(pokemon);
            listItems.push(convertPokemonToLi(pokemon));
        }
        console.log(listItems);
});
*/
/*
pokeApi.getPokemons()
    .then((pokemons = []) => {
        /*
        const newList = pokemons.map(pokemon => {
            return convertPokemonToLi(pokemon);
        });
        */
        /*
        const newList = pokemons.map(pokemon => convertPokemonToLi(pokemon));
        const newHtml = newList.join('');
        */
        /*
        const newHtml = pokemons
            .map(pokemon => convertPokemonToLi(pokemon))
            .join('');
        pokemonList.innerHTML += newHtml;
        */
       /*
        pokemonList.innerHTML += pokemons
            .map(pokemon => convertPokemonToLi(pokemon))
            .join('');
        */
        /*
        pokemonList.innerHTML += pokemons
            .map(convertPokemonToLi)
            .join('');
        */
        
        /*    const newHtml = pokemons
            .map(convertPokemonToLi)
            .join('');
        pokemonList.innerHTML = newHtml;
});
*/

function loadPokemonItems(offset, limit) {
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons
                .map(convertPokemonToLi)
                .join('');

        pokemonList.innerHTML += newHtml;
    });
} 

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordsWithNextPage = offset + limit;

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);

    }

});