var textboxEl = document.querySelector('#textbox-input');

var userInput = textboxEl.value;

var submitButton = document.querySelector('#submit-button');


var pokeContainer = document.querySelector('#poke-container')

var displayCard = function (data) {
	var cardEl = document.createElement("div");
	cardEl.classList.add("card");
	cardEl.textContent = data.name;

	var imgEl = document.createElement("img");
	imgEl.src = data.sprites.front_default;

	cardEl.style.backgroundColor = '#ADD8E6';

	pokeContainer.append(cardEl);
	cardEl.append(imgEl);
}

function getAPI() {
	var userInput = textboxEl.value;
	fetch('https://pokeapi.co/api/v2/pokemon/' + userInput + '/')

		.then(function (response) {

			return response.json();
		})

		.then(function (data) {

			displayCard(data);
		})

		.catch(function (error) {

			// if not in library, say couldn’t be found
		})
};

submitButton.addEventListener('click', getAPI);

