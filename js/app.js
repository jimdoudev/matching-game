/*
 * Create a list that holds all of your cards
 * and declare all global variables
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
			"fa-bomb"];
	deck = document.querySelector('.deck');
	html = "";
	card = document.querySelector('.card');
	opened = [];
	moves = document.querySelector('.moves');
	moveCounter = 0;
	matches = 0;
	stars = document.querySelector('.stars').children;
	restart = document.querySelector('.restart');
	timer = document.querySelector(".timer");
	results = document.querySelector(".results");
	rating = document.querySelector('.stars');
	modal = document.getElementById('modal');
	closeModal = document.querySelector(".close");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame () {
	shuffle(list);
	emptyDeck();
	for(let i = 0; i < list.length; i++) {
		html += '<li class="card">';
		for (let j = 0; j < 1; j++) {
			html += `<i class="fa ${list[i]}"></i>`;
		}
		html += '</li>';
	}
	deck.innerHTML += html;
}

function emptyDeck () {
	let fc = deck.firstChild;
	while(fc) {
		deck.removeChild(fc);
		fc = deck.firstChild;
	};
}

function endGame() {
	stopTimer();
	results.innerHTML = `<span>Moves: ${moveCounter}</span>
						<span>Time: ${timer.textContent}</span>
						<span class="score-panel">Rating:
						<ul class="stars">${rating.innerHTML}</ul></span>`
	modal.style.display = "block";
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function(e) {
	if(e.target.nodeName === 'LI' && !e.target.classList.contains("open")) {
		turnCard(e);
		addToOpened(e);
	}
	checkMatch();
	if(matches === 8) {
		endGame();
	}
})

deck.addEventListener('click', function(e) {
	if(e.target.nodeName === 'LI') {
		startTimer();
	}
}, {once: true})

restart.addEventListener('click', function() {
	location.reload();
})

closeModal.addEventListener('click', function() {
	location.reload();
})

function checkMatch() {
	if(opened.length > 1) {
		if(opened[0] === opened[1]) {
			const openCards = document.querySelectorAll('.open');
			openCards[0].classList.add('match');
			openCards[1].classList.add('match');
			openCards[0].classList.remove('open');
			openCards[1].classList.remove('open');
			opened = [];
			counter();
			starEvaluation();
			matches++;
		} else {
			const openCards = document.querySelectorAll('.open');
			setTimeout(function() {
				openCards[0].classList.remove('open', 'show');
				openCards[1].classList.remove('open', 'show');
		    	}, 400);
			opened = [];
			counter();
			starEvaluation();
		}
	}
}

function starEvaluation() {
	if (moveCounter > 10) {
		stars[2].style.removeProperty('color');
	}
	if (moveCounter > 18) {
		stars[1].style.removeProperty('color');
	}
}

function counter() {
	moveCounter += 1;
	moves.textContent = moveCounter;
}

function turnCard(evt) {
	evt.target.classList.add('open', 'show');
}

function addToOpened(evt) {
	opened.push(evt.target.innerHTML);
}
//Function timer with some modifications from https://jsfiddle.net/hzLf3e38/4/
let t;
function startTimer() {
    let time = 0
    t = setInterval(function(){
        time++
        let sec = time % 60
        let min = (time-sec)/60 % 60
        let hour = (time-sec-min*60)/3600
        let str= ("0"+min).slice(-2)+':'+("0"+sec).slice(-2)
        timer.textContent = str;
    },1000);
}

function stopTimer() {
	clearInterval(t);
}

startGame();