
var submitButton = document.querySelector('#submit-button');
var backButton = document.querySelector('#go-back');
var pokeContainer = document.querySelector('#poke-container');
var headStyle = document.querySelector("#title-head");
var searchStyle = document.querySelector("#search-column");
var searchCounter = 0;
var savedSearches = []

searchStyle.style.border = "3px solid white";
headStyle.style.border = "3px solid white";

var displayCard = function (data) {
	var columnEl = document.createElement("div");
	var cardEl = document.createElement("div");
	columnEl.classList.add("column", "is-one-third");

	cardEl.classList.add("card","mb-5");

	cardEl.setAttribute('id', "card-text");
	cardEl.textContent = data.name;
	cardEl.style.border = "3px solid white";
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
	var textboxEl = document.querySelector('#textbox-input');
	var userInput = textboxEl.value;
	var userInputLowerCase = userInput.toLowerCase();
	console.log(userInput);
	searchCounter++;

	savedSearches.push(userInputLowerCase);
	localStorage.setItem("pokesearches", JSON.stringify(savedSearches));

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
			getHistory();
			console.log(data)
		})

		.catch(function (error) {

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
			})
	}
};

submitButton.addEventListener('click', getAPI);
backButton.addEventListener('click', displayAllPokemon);
var textboxEl = document.querySelector('#textbox-input');
textboxEl.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		getAPI();
	}
});

displayAllPokemon();
var pokeSearchHistory = document.getElementById("pokeSearchList")
function getHistory() {
	var getStorage = JSON.parse(localStorage.getItem("pokesearches"));
	console.log(getStorage);
	for (let i = 0; i < getStorage.length; i++) {
		var newLi = document.createElement("li")
		newLi.textContent = getStorage[i];
		pokeSearchHistory.append(newLi);

	}
}
getHistory();