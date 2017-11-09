const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
var searchInput = document.querySelector('.search');
var suggestions = document.querySelector('.suggestions');

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));

function findMatches(criteria, filterable){
	return cities.filter((place) => {
		var wordToMatch = criteria;
		//figure out if the city matches the criteria
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWithCommas(number){
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
	var resultsArr = findMatches(this.value, cities);
	const html = resultsArr.map((place) => {
	const regex = new RegExp(this.value, 'gi');
	var cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
	var stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
	var population = numberWithCommas(place.population);
		return `
			<li>
				<span class="name">${cityName}, ${stateName}</span>
				<span class="population">Population: ${population}</span>
			</li>
			`
	}).join('');

	suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);