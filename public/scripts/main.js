var searchContainer = $(".search-container");
var resultsContainer = $(".results-container");
var apiUrl;

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: apiUrl,
    data: {
      s: searchTerm,
      r: 'json',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function displayAllMovies(data) {
	var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
    	clickFunction = "loadDetailsPage('" + item.imdbID + "')";
    	resultElement += '<a class="d-block" href="#details" onclick="' + clickFunction+ '"><strong>' + item.Title + '</strong> (' + item.Year + ')</a>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  teste = data.Search;

  $('.results-container').html(resultElement);  
}

function displayOneMovie(data) {
	console.log("deu boa");
}


function watchSubmit() {
	$('form').submit(function (e) {
		searchContainer.attr('id', 'reduced');
		apiUrl = "http://omdbapi.com/?apikey=a3a773d5&s=";
	  var query = $('.text-input').val();
	  getDataFromApi(query, displayAllMovies);
	});
}	 

$(function(){watchSubmit();});

function loadDetailsPage(id) {
	searchContainer.addClass('d-none');
	resultsContainer.addClass('d-none');

	apiUrl = "http://omdbapi.com/?apikey=a3a773d5&i=";
  getDataFromApi(id, displayOneMovie);
}