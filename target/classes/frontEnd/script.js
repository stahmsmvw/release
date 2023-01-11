var correctCard = null;
var ids = [];
var counter = 0;
var playerController;

/**
 * @author Vincent Parik Westlund
 */

window.onload = () => {
    //location.replace('localhost://3001/login')
    newRound();
    //auth();
}

/**
 * <---------------------------------------------------- Web Stuff ---------------------------------------------------->
 *
 * Most of the prep-work for the guessing-game. Fetch is used to grab
 * @param {} movieID for much of the use seen below.
 */

function newRound() {
    fetch('http://localhost:10123/api/movieid/game-instance')
        .then((response) => response.json())
        .then((data) => {
            let gameIDs = [];
            for (const obj of data) {
                gameIDs.push(obj.movieID);
            }
            ids = gameIDs;
            let correctAnswer = assignCorrectAnswer(ids);
            pushPosters(ids);
            pushWebPlayer(correctAnswer);
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
    let cardsBack = document.getElementsByClassName("flip-card-back-image");
    for (let i = 0; i < cardsFront.length; i++) {
        cardsFront[i].style.backgroundImage = "url(http://img.omdbapi.com/?i=" + movieIDs[i] + "&apikey=10f5a22c)";
        cardsBack[i].style.backgroundImage = "url(http://img.omdbapi.com/?i=" + movieIDs[i] + "&apikey=10f5a22c)";
    }
}

/**
 * Checks the chosen
 * @param {*} index of card in user interface corresponding to index of cards currently stored
 * and notifies the user depending on result
 */

function checkAnswer(index) {
    let answer = ids[index];
    let validity = isCorrect(answer);
    inTransitionButton(validity, index);
    resetElements();
    newRound();
}

function resetElements() {
    let cardsFront = document.getElementsByClassName("flip-card-front");
    let cardsBack = document.getElementsByClassName("flip-card-back-image");
    for (let i = 0; i < cardsFront.length; i++) {
        cardsFront[i].style.backgroundImage = "";
        cardsBack[i].style.backgroundImage = "";
    }
}

/**
 * Takes
 * @param {*} index and
 * @returns if the guess is correct or not
 */

function isCorrect(answer) {
    if (answer === correctCard) {
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
    button.addEventListener("transitionend", function () {
        button.style.backgroundColor = "rgba(0, 0, 0, 0)";
        button.style.transition = "background-color 0.2s ease-in-out"; // remove the transition property
    });
    button.style.transition = "background-color 0.2s ease-in-out";
    if (correctAnswer) {
        button.style.backgroundColor = "rgba(98, 236, 77, 0.8)";
    } else if (!correctAnswer) {
        button.style.backgroundColor = "rgba(255, 23, 23, 0.8)";
    }
}

/**
 * Fetches a title from the OMDB API for further use below
 * @param {} movieID ID for the movies title.
 */

function getOMDBTitle(movieID) {
    let key = "10f5a22c";
    let endpoint = `http://omdbapi.com/?apikey=${key}&i=${movieID}`;
    $.get(endpoint, function(data, status) {
        let value = `${data.Title}`;
        console.log("TITLE HERE.")
        console.log(value);
        return value;
    })
    /*
    let key = "10f5a22c";
    let endpoint = `http://omdbapi.com/?apikey=${key}&i=${movieID}`;
    fetch(endpoint).
    then((response) => response.json()
        .then((data) => {
            let value = `${data.Title}`;
            return value;
        }))

     */
}

/**
 * <---------------------------------------------------- Spotify Stuff --------------------------------------------------->
 */


/**
 * Loads the API for the Spotify Web Player
 * @param {} IFrameAPI
 */


window.onSpotifyIframeApiReady = (IFrameAPI) => {
    trackID = '6EKywtYHtZLAvxyEcqrbE7';
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '25%',
        height: '150',
        uri: 'spotify:track:' + trackID
        //https://open.spotify.com/track/4lC9s3vwDa16w2G33KfF9C?si=f2cc45ccddab43f1
        //https://open.spotify.com/episode/4wsepsStgBMUlpbT16tRZm?si=lR9_JaboQjqBG_Z1O6zC3w
    };
    let callback = (EmbedController) => {
        document.querySelectorAll('ul#episodes > li > button').forEach(
            episode => {
                episode.addEventListener('click', () => {
                    EmbedController.loadUri(episode.dataset.spotifyId)
                });
            })
    };
    playerController = IFrameAPI.createController(element, options, callback);
}


/**
 * Loads authorization token for the player
 */
function pushWebPlayer(correctCard) {
    let title = getOMDBTitle(correctCard);
    let trackUri = searchTracks(title);
    console.log(trackUri + "track uri")
    playerController.loadUri(trackUri);
    /*
    IFrameAPI.addTrack()
    let callback = (EmbedController) => {
        document.querySelectorAll('ul#episodes > li > button').forEach(
            episode => {
                episode.addEventListener('click', () => {
                    EmbedController.loadUri()
                });
            })
    };*/
    /*var spotifyURI = searchTracks(getOMDBTitle(correctCard));
    let element = document.getElementById('embed-iframe');
    let options = {
        width: '25%',
        height: '150',
        uri: spotifyURI
        //https://open.spotify.com/track/4lC9s3vwDa16w2G33KfF9C?si=f2cc45ccddab43f1
        //https://open.spotify.com/episode/4wsepsStgBMUlpbT16tRZm?si=lR9_JaboQjqBG_Z1O6zC3w
        //trackID = '6EKywtYHtZLAvxyEcqrbE7';
    };
    let callback = (EmbedController) => {
        document.querySelectorAll('ul#episodes > li > button').forEach(
            episode => {
                episode.addEventListener('click', () => {
                    let uriTrack = searchTracks();
                    EmbedController.loadUri(uriTrack)
                });
            })
    };
    IFrameAPI.createController(element, options, callback);

     */
}

function searchTracks(movieTitle) {
    let endpoint = `http://localhost:10123/audio/search/${movieTitle}`;
    $.get(endpoint, function(data, status) {
        let value = `${data.body.tracks.item[0].uri}`;
        console.log("URI")
        console.log(value);
        return value;
    })
    /*
fetch('http://localhost:10123/audio/search/' + movieTitle)
    .then(response => {
        let value = response.body.tracks.items[0].uri;
        console.log("SEARCH RESULT HERE");
        console.log(value);
        return value;
    });
     */
}



/*
function auth() {

    var client_id = 'e46654a198024b1e97a655387975bdf3';
    var client_secret = '38f7b34e697340989b6dff7ff9421085';
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    fetch('https://reqbin.com/echo/post/json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": 78912})
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/users/jmperezperez',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                console.log(body);
            });
        }
    });

     
}
*/