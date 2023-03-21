var textboxEl = document.querySelector('#textbox-input');

var userInput = textboxEl.value;

var submitButton = document.querySelector('#submit-button');





// fetch('https://pokeapi.co/api/v2/pokemon/' + userInput + '/')
function getAPI(){
	var userInput = textboxEl.value;
fetch('https://pokeapi.co/api/v2/pokemon/' + userInput + '/')

	.then(function(response) {

		return response.json();
	})
	
	.then(function(data) {
		
		console.log(data);
		// show on screen;
	})

	.catch(function(error) {
        
		// if not in library, say couldn’t be found
	})};

	submitButton.addEventListener('click', getAPI);
	console.log(getAPI);

