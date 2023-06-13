const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonProx = document.querySelector('.btn-prox');
const buttonAnt = document.querySelector('.btn-ant');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status == 200) {

        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "loading...";

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display ='block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display ='none'
        pokemonName.innerHTML = "Não encontrado";
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = ''
});

buttonAnt.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon);
        input.value = ''
    }
});
        

buttonProx.addEventListener('click', () => {

    searchPokemon++
    
    renderPokemon(searchPokemon);
    input.value = ''
});

renderPokemon(searchPokemon)