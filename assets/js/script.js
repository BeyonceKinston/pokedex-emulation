var textboxEl = document.querySelector('#textbox-input');

var userInput = textboxEl.value;

// fetch('https://pokeapi.co/api/v2/pokemon/' + userInput + '/')

fetch('https://pokeapi.co/api/v2/pokemon/gengarini')

	.then(function(response) {

		return response.json();
	})
	
	.then(function(data) {
		
		console.log(data);
		// show on screen;
	})

	.catch(function(error) {
        
		// if not in library, say couldn’t be found
	});