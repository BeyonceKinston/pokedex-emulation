var textboxEl = document.querySelector('#textbox-input');

var userInput = textboxEl.value;

var submitButton = document.querySelector('#submit-button');


var pokeContainer = document.querySelector('#poke-container')

var displayCard = function (data) {
	var cardEl = document.createElement("div");
	cardEl.classList.add("card");
	cardEl.classList.add("mb-5");
	cardEl.textContent = data.name;

	var imgEl = document.createElement("img");
	imgEl.src = data.sprites.front_default;
	var numEl = document.createElement("p");
	numEl.textContent = data.id;

	var idEl = document.createElement("div");
	idEl.textContent = "Pokedex # : " + data.id;

	pokeContainer.append(cardEl);
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
	}

function getAPI() {

	// Change #2
	var userInput = textboxEl.value.toLowerCase();

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

	for (var i = 0; i < 1281; i++) {
		
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
displayAllPokemon();

