//  global variables
var dateTimeEl = $('#date-time');
var museumEl = $('#museum-id');
var searchTextEl = $('#search-text');
var searchBtnEl = $('#search-btn');
var searchListEl = $('#search-list');
var historyEl = $('#history-card');
var resultEl = $('#results');

// stored data
var searchHist = [];
var searchData = {
    museum: String,
    serachText: String
};

// funtion to display time
function displayTime() {
    var now = moment().format('MMM DD, YYYY hh:mm:ss a');
    dateTimeEl.text(now);
}

// call displayTime function in every second
setInterval(displayTime, 1000);

// remove search text from history
function removeSearchText(sText, museum){
    var found = false;
    for (var i = 0; i < searchHist.length; i++) {
        if (sText === searchHist[i].serachText && museum === searchHist[i].museum) {
            found = true;
            break;
        }
    }  
    if (found) {
        searchHist.splice(i, 1);
        saveSearch();
    }
}

// search museum for text from the history (handle click on close button)
function searchMuseumFromHist(event) {
    event.preventDefault();
    
    // find id and check if its close button
    var histText = event.target.id;
    var sText, museum, token;
    token = histText.split('_')[0];
    sText = token.split('-')[0];
    museum = token.split('-')[1];
    if (histText.indexOf('close') > 0) {
        removeSearchText(sText, museum);
        $(event.target).parent().remove();
        // clear result page
        resultEl.empty();
    }
    else {
        searchMuseum(sText, museum)
    }
}


// search museum for text
function searchMuseum(sText, museum) {
    var url;
    if (museum == 'Met')
        url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
    else if (museum == 'ArtIC')
        url = "https://api.artic.edu/api/v1/artworks/search?q=";
    url += sText;
    console.log(url, sText);

    // fetch data
    fetch(url)
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
        else 
            resultEl.empty();
            throw new Error("Error searching " + sText + " in " + museum + " " + response.statusText)            
        }) 
        .then(function (data) {
            resultEl.text(data);
            console.log(data);

        })
        .catch(function(error) {
            resultEl.html("<h5 class='p-1 ml-2 mt-2'>" + error.message + "<h5>");
        });
}

// update search list
function updateSearchList(sText, museum) {
    // template
    // <li class="list-group-item p-2 ml-2 mr-2">An item<span class="btn close btn-secondary">X</span></li>

    // list item
    var liEl = $('<li>');
    liEl.addClass('list-group-item small-text');
    liEl.attr('id', sText + '-' + museum);
    liEl.text(sText + '     (' + museum + ')');
    liEl.on('click', searchMuseumFromHist);

    // close button
    var spanEl = $('<span>');
    spanEl.addClass('btn close btn-secondary small-text');
    spanEl.text('X');
    spanEl.attr('id', sText + '-' + museum + '_close');

    // add close button to list item
    liEl.append(spanEl);

    // add list item to ul
    searchListEl.append(liEl);

    //  clear search field
    searchTextEl.val('');
}

// show/hide search history
function showHide() {
    if (!searchHist.length)
        historyEl.addClass('invisible');
    else
        historyEl.removeClass('invisible');
}

// save searches
function saveSearch() {
    console.log(searchHist);
    var str = JSON.stringify(searchHist);
    localStorage.setItem('searches', str);
    showHide();
}

// save new search text
function saveSearchText(sText, museum) {
    // first check if we have it in history already
    var found = false;
    for (var i = 0; i < searchHist.length; i++) {
        if (sText === searchHist[i].serachText && museum === searchHist[i].museum) {
            found = true;
            break;
        }
    }   
    // add search text to list and then save
    if (!found) {
        var searchData = new Object();
        searchData.museum = museum;
        searchData.serachText = sText;
        searchHist.push(searchData);
        saveSearch()
    }
    showHide();
}

// function load saved cities
function loadSavedSearchText() {
    var str = localStorage.getItem('searches');
    searchHist = JSON.parse(str);
    if (!searchHist) {
        searchHist = [];
    }
    else {
        var sText, museum;
        for (var i = 0; i < searchHist.length; i++){
            sText = searchHist[i].serachText;
            museum = searchHist[i].museum;
            updateSearchList(sText, museum);
        }        
    }
    showHide();
}

// toggle search button
function disableSearchButton(val) {
    searchTextEl.attr('disabled', val);
    searchBtnEl.attr('disabled', val);

    // hide/unhide history list
    if (val) 
        historyEl.removeClass('card');
    else
        historyEl.addClass('card');
}

// disable search at start-up until user selects a museum
$(document).ready(function() {
    disableSearchButton(true);
    loadSavedSearchText();
});

// event handler for museum select - enable search
museumEl.change(function() {
    var option = museumEl.val();
    
    if (option === 'none')
        disableSearchButton(true);
    else
        disableSearchButton(false);
});

// event handler for main serach button
searchBtnEl.on('click', function(event) {
    event.preventDefault();
    var sText = searchTextEl.val();
    var museum = museumEl.val();

    saveSearchText(sText, museum);
    updateSearchList(sText, museum);
    searchMuseum(sText, museum);
});
