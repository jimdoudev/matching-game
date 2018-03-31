/*
 * Creates a list that holds all of the cards
 * and declares all global variables
 */
let list = ["fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
];
let deck = document.querySelector('.deck');
let html = "";
let card = document.querySelector('.card');
let opened = [];
let moves = document.querySelector('.moves');
let moveCounter = 0;
let matches = 0;
let stars = document.querySelector('.stars').children;
let restart = document.querySelector('.restart');
let sound = document.querySelector('.sound');
let timer = document.querySelector(".timer");
let results = document.querySelector(".results");
let rating = document.querySelector('.stars');
let modal = document.getElementById('modal');
let closeModal = document.querySelector(".close");


/*
 * All function declarations
 */

//Starts the game
function startGame() {
    shuffle(list);
    emptyDeck();
    for (let i = 0; i < list.length; i++) {
        html += '<li class="card">';
        for (let j = 0; j < 1; j++) {
            html += `<i class="fa ${list[i]}"></i>`;
        }
        html += '</li>';
    }
    deck.innerHTML += html;
}

//Empties the deck
function emptyDeck() {
    let fc = deck.firstChild;
    while (fc) {
        deck.removeChild(fc);
        fc = deck.firstChild;
    }
}

//Ends the game
function endGame() {
    stopTimer();
    results.innerHTML = `<span>Moves: ${moveCounter}</span>
						<span>Time: ${timer.textContent}</span>
						<span class="score-panel">Rating:
						<ul class="stars">${rating.innerHTML}</ul></span>`;
    modal.style.display = "block";
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Checks if two cards match
function checkMatch() {
    if (opened.length > 1) {
        if (opened[0] === opened[1]) {
            const openCards = document.querySelectorAll('.open');
            openCards[0].classList.add('match', 'animated', 'tada');
            openCards[1].classList.add('match', 'animated', 'tada');
            setTimeout(function() {
                openCards[0].classList.remove('open', 'show', 'animated', 'tada');
                openCards[1].classList.remove('open', 'show', 'animated', 'tada');
            }, 350);
            opened = [];
            counter();
            starEvaluation();
            matches++;
        } else {
            const openCards = document.querySelectorAll('.open');
            openCards[0].classList.add('open', 'show', 'animated', 'wobble', 'unmatch');
            openCards[1].classList.add('open', 'show', 'animated', 'wobble', 'unmatch');
            setTimeout(function() {
                openCards[0].classList.remove('open', 'show', 'animated', 'wobble', 'unmatch');
                openCards[1].classList.remove('open', 'show', 'animated', 'wobble', 'unmatch');
            }, 350);
            opened = [];
            counter();
            starEvaluation();
        }
    }
}

//Removes stars according to moves
function starEvaluation() {
    if (moveCounter > 10) {
        stars[2].style.removeProperty('color');
    }
    if (moveCounter > 18) {
        stars[1].style.removeProperty('color');
    }
}

//Resets the Star Count
function starReset() {
    if (moveCounter > 10) {
        stars[2].style.color = "yellow";
        stars[1].style.color = "yellow";
    }
}

//Counts the moves
function counter() {
    moveCounter += 1;
    moves.textContent = moveCounter;
}
//Resets the move counter
function resetCounter() {
    moveCounter = 0;
    moves.textContent = 0;
}

//Turns the card
function turnCard(evt) {
    evt.target.classList.add('open', 'show');
}

//Adds the opened card to the opened array
function addToOpened(evt) {
    opened.push(evt.target.innerHTML);
}

//Function timer with some modifications from https://jsfiddle.net/hzLf3e38/4/
let t;

function startTimer() {
    let time = 0;
    t = setInterval(function() {
        time++;
        let sec = time % 60;
        let min = (time - sec) / 60 % 60;
        let str = ("0" + min).slice(-2) + ':' + ("0" + sec).slice(-2);
        timer.textContent = str;
    }, 1000);
}

//Stops the timer
function stopTimer() {
    clearInterval(t);
}

//Resets the timer
function resetTimer() {
    clearInterval(t);
    timer.textContent = "00:00";
}

/*
 * All Event Listeners
 */

//Turns the cards and eventually ends the game
deck.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI' && !e.target.classList.contains("open")) {
        turnCard(e);
        addToOpened(e);
    }
    checkMatch();
    if (matches === 8) {
        endGame();
    }
});


//Starts the timer on click
deck.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI') {
        startTimer();
    }
}, { once: true });

//Restarts the game
restart.addEventListener('click', function() {
    resetTimer();
    starReset();
    resetCounter();
    opened = [];
    matches = 0;
    html = "";
    startGame();
    deck.addEventListener('click', function(e) {
        if (e.target.nodeName === 'LI') {
            startTimer();
        }
    }, { once: true });
});

//Turns off and on the sound
sound.addEventListener('click', function() {
    if (sound.firstElementChild.classList.contains("fa-volume-off")) {
        sound.innerHTML = '<i class="fa fa-volume-up"></i>';
        document.querySelector('audio').muted = false;
    } else {
        sound.innerHTML = '<i class="fa fa-volume-off"></i>';
        document.querySelector('audio').muted = true;
    }

});

//Closes the congratulations modal and restarts the game
closeModal.addEventListener('click', function() {
    resetTimer();
    starReset();
    resetCounter();
    opened = [];
    matches = 0;
    html = "";
    startGame();
    modal.style.display = "none";
    deck.addEventListener('click', function(e) {
        if (e.target.nodeName === 'LI') {
            startTimer();
        }
    }, { once: true });
});

startGame();