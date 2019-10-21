var searchContainer = $(".search-container");
var resultsContainer = $(".results-container");
var detailsContainer = $(".details-container");
var apiUrl;

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: apiUrl + searchTerm,
    data: {
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
  if (data) {
    $('.movie-title').text(data.Title);
    $('.date-genre').text(data.Released + " - " + data.Genre);
    $('.awards').text(data.Awards);
    $('.poster').attr('src', data.Poster);
    $('.plot').text(data.Plot);
    $('.actors').text(data.Actors);
    $('.director').text(data.Director);
    $('.writer').text(data.Writer);

    if(data.Ratings[0]) {
    	$('.first-source').text(data.Ratings[0].Source);
	    $('.first-rating').text(data.Ratings[0].Value);	
    }

    if(data.Ratings[1]) {
		 	$('.second-source').text(data.Ratings[1].Source);
    	$('.second-rating').text(data.Ratings[1].Value);
    }

    searchContainer.addClass('d-none');
		resultsContainer.addClass('d-none');
		detailsContainer.addClass('d-block');
  }
}


function watchSubmit() {
	$('form').submit(function (e) {
		apiUrl = "http://omdbapi.com/?apikey=a3a773d5&s=";
	  var query = $('.text-input').val();
	  searchContainer.attr('id', 'reduced');
	  getDataFromApi(query, displayAllMovies);
	});
}	 

$(function(){watchSubmit();});

function loadDetailsPage(id) {
	apiUrl = "http://omdbapi.com/?apikey=a3a773d5&i=";
  getDataFromApi(id, displayOneMovie);
}