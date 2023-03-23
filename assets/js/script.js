var textboxEl = document.querySelector('#textbox-input');
var userInput = textboxEl.value;
var submitButton = document.querySelector('#submit-button');
var backButton = document.querySelector('#go-back');
var pokeContainer = document.querySelector('#poke-container');

var searchCounter = 0;
var savedSearches = []

function storeSearches(){
	localStorage.setItem("pokesearches", savedSearches);


}
storeSearches();

var displayCard = function (data) {
	

	var columnEl = document.createElement("div");
	var cardEl = document.createElement("div");
	columnEl.classList.add("column", "is-one-third");
	cardEl.classList.add("card","mb-5");
	cardEl.textContent = data.name;

	var imgEl = document.createElement("img");
	imgEl.src = data.sprites.front_default;
	var numEl = document.createElement("p");
	numEl.textContent = data.id;

	var idEl = document.createElement("div");
	idEl.textContent = "Pokedex # : " + data.id;
	pokeContainer.append(columnEl);
	columnEl.append(cardEl);
	cardEl.append(imgEl);
	cardEl.append(idEl);
	var typeEl = document.createElement("type");

	if (data.types.length === 2) {

		for (var i = 0; i < data.types.length; i++) {

			typeEl.textContent = data.types[0].type.name + " / " + data.types[1].type.name;

		}
	} else {
		
		typeEl.textContent = data.types[0].type.name;
	}
	
	cardEl.append(typeEl)

	cardEl.style.backgroundColor = '#ADD8E6';
};

function getAPI() {

	searchCounter++;
	// Change #2
	var userInput = textboxEl.value.toLowerCase();
	localStorage.setItem("pokesearches", userInput);

	while (pokeContainer.firstChild) {
		pokeContainer.removeChild(pokeContainer.firstChild);
	  }
	  textboxEl.value = "";

	fetch('https://pokeapi.co/api/v2/pokemon/' + userInput + '/')

		.then(function (response) {

			return response.json();
		})

		.then(function (data) {

			displayCard(data);
			console.log(data)
		})
		
		.catch(function (error) {

			// if not in library, say couldn’t be found
		})
};

function displayAllPokemon() {

	if (searchCounter > 0) {

		while (pokeContainer.firstChild) {
			pokeContainer.removeChild(pokeContainer.firstChild);
		  }
	}

	for (var i = 1; i <= 150; i++) {
		
		fetch('https://pokeapi.co/api/v2/pokemon/' + i + '/')

		.then(function (response) {

			return response.json();
		})

		.then(function (data) {

			displayCard(data);
		})

		.catch(function (error) {

			// if not in library, say couldn’t be found
		})
	}
};

submitButton.addEventListener('click', getAPI);
backButton.addEventListener('click', displayAllPokemon);
textboxEl.addEventListener('keypress', function (e) {
	    if (e.key === 'Enter') {
	      getAPI();
	    }
	});

displayAllPokemon();

