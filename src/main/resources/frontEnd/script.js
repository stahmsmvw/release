var correctCard = null;
var ids = [];
var counter = 0;

/**
 * @author Vincent Parik Westlund
 */

window.onload = () => {
    newNewerRound();
}

/**
 * Most of the prep-work for the guessing-game. Ajax is used to grab @param {} movieID for much of the use seen below. 
 * @returns 
 */

async function newRound() {

    let endpoint = 'http://localhost:10123/api/movieid/game-instance';

    return $.ajax({
      method: "GET",
      url: endpoint,
      headers: { "Accept": "application/json" }
    }).done(function(response) {
        let gameIDs = [];
        for(const obj of response) {
            gameIDs.push(obj.movieID);
            ids.push(obj.movieID);
        }
        let chosenID = assignCorrectAnswer(ids);
        pushPosters(ids);
        pushWebPlayer(chosenID);
    }).catch(error => {
        console.log(error);
    });
}

/**
 * @todo NOT TESTED. Synchronous version of the same script above. 
 */

function newNewerRound() {
    fetch('http://localhost:10123/api/movieid/game-instance')
    .then((response) => response.json())
    .then((data) => {
        let gameIDs = [];
        for(const obj of data) {
            gameIDs.push(obj.movieID);
        }
        ids = gameIDs;
        let answer = assignCorrectAnswer(ids);
        pushPosters(ids);
        pushWebPlayer(answer)
    });
}

/**
 * 
 * @param {*} movieID Chosen MovieID to be extracted from OMDB
 */

function pushWebPlayer(movieID) {
    let title = getOMDBTitle(movieID);

    /**
     * The method above returns the correct value in console.log (inside the method) but I can't access it through console.log here. What could be wrong?
     */
    //console.log(title);
    /**
     * What do?
     */
}

/**
 * Fetches a title from the OMDB API for further use
 * @param {} movieID ID for the movies title.
 */

function getOMDBTitle(movieID) {
    let key = "10f5a22c";
    let endpoint = `http://omdbapi.com/?apikey=${key}&i=${movieID}`;
    $.get(endpoint, function(data, status) {
        let value = `${data.Title}`;
        return value;
    });
}

/**
 * Takes an array of 
 * @param {*} ids and assigns a random index between 0 and 3 to be the correct ID for guessing
 */

function assignCorrectAnswer(ids) {
    correctCard = ids[randomNumber()]
    return correctCard;
}

/**
 * @returns A random number between 0 and 3 :-)
 */

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

/**
 * Loops through all cards and paints the front and back with a poster grabbed from the OMDB-API
 * @param {} movieIDs ID of the poster to paint
 */

function pushPosters(movieIDs) {
    let cardsFront = document.getElementsByClassName("flip-card-front");
    let cardsBack  = document.getElementsByClassName("flip-card-back-image");
    for(let i = 0; i < cardsFront.length; i++) {
        cardsFront[i].style.backgroundImage = "url(http://img.omdbapi.com/?i=" + movieIDs[i] + "&apikey=10f5a22c)";
        cardsBack[i].style.backgroundImage  = "url(http://img.omdbapi.com/?i=" + movieIDs[i] + "&apikey=10f5a22c)";
    }
}

/**
 * Checks the chosen
 * @param {*} index of card in user interface corresponding to index of cards currently stored
 * and notifies the user depending on result
*/

function checkAnswer(index) {
    let answer = ids[index];
    let correct = isCorrect(answer);
    inTransitionButton(correct, index);
    resetElements();
    newNewerRound();
}

function resetElements() {
    let cardsFront = document.getElementsByClassName("flip-card-front");
    let cardsBack  = document.getElementsByClassName("flip-card-back-image");
    for(let i = 0; i < cardsFront.length; i++) {
        cardsFront[i].style.backgroundImage = "";
        cardsBack[i].style.backgroundImage  = "";
    }
}

/**
 * Takes
 * @param {*} index and
 * @returns if the guess is correct or not
 */

function isCorrect(answer) {
    if(answer === correctCard) {
        return true;
    } else {
        return false;
    }
}

/**
 * Takes input to notify the user of the choice via coloring
 * @param {*} correctAnswer determines which color to paint with
 * @param {*} index determines which button to paint
*/

function inTransitionButton(correctAnswer, index) {
    let foo = "btn" + index;
    let button = document.getElementById(foo);
    if (correctAnswer) {
        button.style.backgroundColor = "rgba(98, 236, 77, 0.5)";
        button.innerHTML = "Correct!";
        counter++;
    } else {
        button.style.backgroundColor = "rgba(255, 23, 23, 0.5)";
        button.innerHTML = "False!";
    }
    button.style.transition = "background-color 0.15s ease-out";
}

/**
 * Transitions all buttons from whichever color they were to neutral. To be used when resetting a round.
*/

function outTransitionButton() {
    let buttons = document.getElementsByClassName("flip-card-back-button");
    for(const button of buttons) {
        button.style.backgroundColor = "";
        button.style.transition = "background-color 0.15s ease-in-out";
        button.innerHTML = "Choose!";
    }
}

/**
 * 
 * <----------------------------------- SPOTIFY-STUFF ----------------------------------->
 * 
 */

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '60%',
        height: '200',
        left: '50%',
        uri: 'spotify:track:6pFiKji7aJCwMIYKROgQw9'
      };
    let callback = (EmbedController) => {
      document.querySelectorAll('ul#episodes > li > button').forEach(
        episode => {
          episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
          });
        })
    };
    IFrameAPI.createController(element, options, callback);
};

function loadSong(id) {
    let track = "spotify:track:" + id;
    EmbedController.loadUri(episode.dataset.track);
}
