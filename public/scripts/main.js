var searchContainer = $('.search-container');
var resultsContainer = $('.results-container');
var detailsContainer = $('.details-container');
var apiUrl;

function getData(term, callback) {
  var settings = {
    url: apiUrl + term,
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
    	resultElement += '<a class="content-link d-block" href="#" onclick="' + clickFunction + '"><strong>' + item.Title + '</strong> (' + item.Year + ')</a>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }

  searchContainer.attr('id', 'reduced');
  resultsContainer.html(resultElement);  
}

function displayOneMovie(data) {
  if (data) {
    $('.movie-title').text(data.Title);
    $('.date-genre').text(data.Released + " - " + data.Genre);
    $('.awards').text(data.Awards);

    if ((data.Poster) === 'N/A') {
    	$('.poster').attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmLEz6bbT5tcSe83bhjaOqxD6FZyhz6kKd3QcwuOCuvE0Mj9o3');
    } else {
    	$('.poster').attr('src', data.Poster);
    }
    
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

function loadResultsPage() {
  var query = $('.text-input').val();
  apiUrl = "http://omdbapi.com/?apikey=a3a773d5&s=";
  getData(query, displayAllMovies);
}

function loadDetailsPage(id) {
	apiUrl = "http://omdbapi.com/?apikey=a3a773d5&i=";
  getData(id, displayOneMovie);
}