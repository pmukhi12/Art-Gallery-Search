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
var numDisplay = 10;

// funtion to display time
function displayTime() {
    var now = moment().format('MMM DD, YYYY hh:mm:ss a');
    dateTimeEl.text(now);
}

// call displayTime function in every second
setInterval(displayTime, 1000);

// get museum name
function getMuseumName(museum) {
    if (museum === 'Met')
        return 'The Metropolitan Museum of Modern Arts';
    else if (museum === 'ArtIC')
        return 'The Art Institue of Chicago';
}

// get museum URL
function getMuseumUrl(museum) {
    if (museum === 'Met')
        return 'https://www.metmuseum.org/';
    else if (museum === 'ArtIC')
        return 'https://www.artic.edu/';
}

// result display is done using table with two columns
// left column for item description
// right column for item image

// display Met Museum results - only first 10 items
function displayMetResult(data, sText, museum) {
    // console.log(data);
    // empty result pane
    resultEl.empty();

    // result heading
    var h3El = $('<h3>');
    h3El.addClass("card-header");    
    h3El.html("Search Result for <strong>" + sText + "</strong> on " + getMuseumName(museum));
    resultEl.append(h3El);

    // result body
    var divEl = $('<div>');
    divEl.addClass("card-body");    

    // show only numDisplay of them
    var total = data.total;
    var h6El = $('<h6>');
    if (total > 0) {
        h6El.html("Total " + total + " items found, showing first " + numDisplay + " of them, to see all of them please search on <a href=" + getMuseumUrl(museum) + ">" + getMuseumName(museum) + "</a>");
        divEl.append(h6El);

        var tableEl = $('<table>');
        tableEl.addClass("table table-bordered");
        for (var i = 0; i < numDisplay; i++) {
            var objectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + data.objectIDs[i];

            // fetch data
            fetch(objectUrl)
                .then (function(response){
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        // resultEl.empty();
                        throw new Error("Error searching " + sText + " in " + museum + " " + response.statusText);  
                    }          
                }) 
                .then(function (data) {
                    // console.log(data);

                    var rowEl = $('<tr>');
                    rowEl.attr('valign', 'top');
                    rowEl.html("<td><p class='small-text'>Name: " + data.objectName + 
                    "<br>Artist: " + data.artistDisplayName + "<br>Year: " + data.objectDate + "<br>Medium: " + data.medium +
                    "<br>Department: " + data.department + "<br>Period: " + data.period + 
                    "</p></td><td><img src="+data.primaryImageSmall+"></td>");
                    tableEl.append(rowEl);
                })
                .catch(function(error) {
                    var pEl = $('<p>');
                    pEl.addClass('p-1 ml-2 mt-2');
                    pEl.text(error.message);
                    divEl.append(pEl);
                });
        }
        tableEl.html('</table');
    }
    else {
        h6El.html("No item found for " + sText + ", please check your search text!");
        divEl.append(h6El);
    }
    divEl.append(tableEl);
    resultEl.append(divEl);
}

// display ArtIC Museum results - by default it only fetches 10 items
function displayArtICResult(data, sText, museum) {
    var artICData = data.data

    // result heading
    var h3El = $('<h3>');
    h3El.addClass("card-header");    
    h3El.html("Search Result for <strong>" + sText + "</strong> on " + getMuseumName(museum));
    resultEl.append(h3El);

    // result body
    var divEl = $('<div>');
    divEl.addClass("card-body");

    // show only numDisplay of them
    var h6El = $('<h6>');
    if (artICData.length !== 0) {
        h6El.html("Showing first 10 items for " + sText + ". To see all of them please search on <a href=" + getMuseumUrl(museum) + ">" + getMuseumName(museum) + "</a>");
    } else {
        h6El.html("No item found for " + sText + ". Please check your search text!");
    }
    divEl.append(h6El);
    var tableEl = $('<table>');
    tableEl.addClass("table table-bordered");

    for (let i = 0; i < artICData.length; i++) {
        var itemUrl = artICData[i].api_link;
        // console.log(itemUrl);
        // fetch data
        fetch(itemUrl)
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
            else {
                // resultEl.empty();
                throw new Error("Error searching " + sText + " in " + museum + " " + response.statusText);  
            }          
        }) 
        .then(function (data) {
            // console.log(data.data);

            var rowEl = $('<tr>');
            var imageId = data.data.image_id;
            var imageUrl = "https://www.artic.edu/iiif/2/" + imageId + "/full/843,/0/default.jpg";

            rowEl.attr('valign', 'top');
            rowEl.html("<td><p class='small-text'>Name: " + data.data.title + 
            "<br>Artist: " + data.data.artist_display + "<br>Year: " + data.data.fiscal_year +
            "</p></td><td><img src="+imageUrl+" width=300px height=200px></td>");
            tableEl.append(rowEl);
        })
        .catch(function(error) {
            var pEl = $('<p>');
            pEl.addClass('p-1 ml-2 mt-2');
            pEl.text(error.message);
            divEl.append(pEl);
        });
        
    }
    divEl.append(tableEl);
    resultEl.append(divEl);
}


// search museum for text
function searchMuseum(sText, museum) {
    var url;
    if (museum == 'Met')
        url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
    else if (museum == 'ArtIC')
        url = "https://api.artic.edu/api/v1/artworks/search?q=";
    url += sText;
    // console.log(url, sText);

    // fetch data
    fetch(url)
        .then (function(response){
            if (response.ok) {
                return response.json();
            }
        else 
            resultEl.empty();
            throw new Error("Error searching " + sText + " in " + museum + " " + response.statusText);            
        }) 
        .then(function (data) {
            // empty result pane and call display function for respective museum
            resultEl.empty();
            if (museum === 'Met') {
                displayMetResult(data, sText, museum);
            } else {
                displayArtICResult(data, sText, museum);
            }
        })

        .catch(function(error) {
            var h5El = $('<h5>');
            h5El.addClass('p-1 ml-2 mt-2');
            h5El.text(error.message);
            resultEl.append(h5El);
        });
}

// save searches
function saveSearch() {
    // console.log(searchHist);
    var str = JSON.stringify(searchHist);
    localStorage.setItem('searches', str);
    showHide();
}

// save new search text - from input 
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

// event handler for main serach button
searchBtnEl.on('click', function(event) {
    event.preventDefault();

    // remove any whitespace from search text
    var sText = searchTextEl.val().trim();
    var museum = museumEl.val();

    saveSearchText(sText, museum);
    updateSearchList(sText, museum);
    searchMuseum(sText, museum);
});

// event handler for museum select - enable search
museumEl.change(function() {
    var option = museumEl.val();
    
    if (option === 'none')
        disableSearchButton(true);
    else
        disableSearchButton(false);
});


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
        // initialize array, if removed element was the last one in the array
        if (i === 0) 
            searchHist = [];
        else 
            searchHist.splice(i, 1);
    
        saveSearch();
        museumEl.val('none');
        searchTextEl.val(' ');
        disableSearchButton(true);
        showHide();
    }
}

// search museum for text from the history (handle click on close button)
function searchMuseumFromHist(event) {
    event.preventDefault();
    
    // find id and check if its close button
    // console.log(event.target)
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
        disableSearchButton(false);
        museumEl.val(museum);
        searchTextEl.val(sText);
        searchMuseum(sText, museum)
    }
}

// update search list
function updateSearchList(sText, museum) {
    // template
    // <li class="list-group-item p-2 ml-2 mr-2">An item<span class="btn close btn-secondary">X</span></li>

    // list item
    var liEl = $('<li>');
    liEl.addClass('list-group-item');
    liEl.attr('id', sText + '-' + museum);
    liEl.html(sText + ' ' + "<small class='text-muted' id=" + sText + '-' + museum + '>' + museum + '</small>');
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
}

// toggle search button
function disableSearchButton(val) {
    searchTextEl.attr('disabled', val);
    searchBtnEl.attr('disabled', val);
}

// show/hide search history
function showHide() {
    if (!searchHist.length)
        historyEl.addClass('invisible');
    else
        historyEl.removeClass('invisible');
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

// disable search at start-up until user selects a museum
$(document).ready(function() {
    disableSearchButton(true);
    loadSavedSearchText();
});