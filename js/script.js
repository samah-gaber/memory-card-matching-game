var cardsList = document.querySelectorAll(".card");
var allowFlip = false; // to differentiate between first and second cards
var firstCard, secondCard;
var lockBoard = false; // to prevent user from clicking any card 
var count=0; // number of selected matched cards

/*-----flipping cards method-----*/
// It's called when user clicks a card
function flipCard() {
	//prevent user from clicking third card in a row
	if (lockBoard) return; 
	//prevent user from clicking the first card twice
	if (this===firstCard) return;
	this.classList.add("flip");
	if(!allowFlip){
		allowFlip=true;
		firstCard=this;
	} else {
		secondCard=this;
		checkMatchingCards();
	}
}

/*-----checking for matching cards by using dataser attribute from html-----*/
function checkMatchingCards() {
	if (firstCard.dataset.framework===secondCard.dataset.framework){
			count+=2;
			// when user wins the game
			if(count===12){
				clearInterval(intervalVar);
				setTimeout(()=>{
					document.getElementById('winMsg').style.display="block";
				},1500);
			}
			hideCards();
		}else {
			unflipCards();
		}
}

/*------hiding matched cards-----*/
function hideCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	lockBoard = true;
	setTimeout(()=>{
		firstCard.style.visibility="hidden";
		secondCard.style.visibility="hidden";
		resetBoard();
	},1500);
}

/*-----unflipping unmatched cards-----*/
function unflipCards() {
	lockBoard = true;
	setTimeout(()=>{
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");
			resetBoard();
			},1500);
}

/*-----resetting game board-----*/
function resetBoard (){
	allowFlip=false;
	lockBoard=false;
	firstCard=null;
	secondCard=null;
}

/*-----shuffling cards-----*/
(function shuffle() {
	cardsList.forEach(card=>{
		var randomPos = Math.floor(Math.random()*12);
		card.style.order=randomPos;
	});
})();

cardsList.forEach(card => card.addEventListener("click", flipCard));

/*-------Timer method--------*/
var intervalVar = null;
var startTimer = 180;
var timerMethod = function () {
	var display = document.querySelector('#timerDisplay');
	minutes = parseInt(startTimer / 60, 10)
	seconds = parseInt(startTimer % 60, 10);

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	display.textContent = minutes + ":" + seconds;
	if (--startTimer < 0) {
		lockBoard=true;
		document.getElementById('loseMsg').style.display="block";
		clearInterval(intervalVar);
	}
}

window.onload = function () {
	intervalVar = setInterval(timerMethod, 1000);
};
