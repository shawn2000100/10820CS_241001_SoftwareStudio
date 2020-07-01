


window.onload = function() {
    initEasyMode();
};

/* ******************************************** */
var modes = document.querySelectorAll("#mode");
var cardContainer = document.getElementById("card-container");
var timerDisplay = document.querySelector("#timer");
var timer;
var numCards;
var cards;
var currentMode;
/* ******************************************** */
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

function initEasyMode() {
    // clear the timer from nightmare mode
    if(timer){
        clearTimer();
    }
    currentMode = 'easy';
    numCards = 3;
    cardContainer.innerHTML=`
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    `;
    cards = document.querySelectorAll(".card");
    initCards();
    reset();
}

/***************************************************** */
for(let i = 0; i < modes.length; ++i){
    var el = modes[i];
    el.addEventListener("click", function() {
        for(m of modes){
            m.classList.remove("selected");
        }
        this.classList.add("selected");
    });
}

modes[0].addEventListener("click", initEasyMode);
modes[1].addEventListener("click", initHardMode);
modes[2].addEventListener("click", initNightmareMode);

function initHardMode() {
    // clear the timer from nightmare mode
    if(timer){
        clearTimer();
    }
    currentMode = 'hard';
    numCards = 6;
    cardContainer.innerHTML=`
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    `;
    cards = document.querySelectorAll(".card");
    reset();
    initCards();
}

function initNightmareMode() {
    if(timer){
        clearTimer();
    }
    currentMode = 'nightmare';
    numCards = 6;
    cardContainer.innerHTML=`
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    `;
    cards = document.querySelectorAll(".card");
    initCards();
    reset();
    resetButton.style.display = "none";
}
/***************************************************** */

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                clearTimer();
                resetDisplay.textContent = "Play Again"
                resetButton.style.display = "Block";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if(currentMode === 'nightmare'){
        resetButton.style.display = "none";
        countDown();
    }else{
        clearTimer();
        resetButton.style.display = "Block";       
    }

    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

/******************************************* */
function countDown(){
    var seconds = 5;
    timerDisplay.textContent = '  ' + seconds;
    timer = setInterval(function() {        
        seconds = seconds - 1;
        timerDisplay.textContent = '  ' + seconds;
        if(seconds >= 1){
            body.style.background = "white";
            setTimeout(( () => body.style.background = "#232323" ), 70);
        }
        if (seconds <= 0){
            clearTimer();
            messageDisplay.textContent = "TIMEOUT!";
            resetDisplay.textContent = "Play Again";
            resetButton.style.display = "Block";
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            // return;
        }
    }, 1000);
}

function clearTimer(){
    if(timer){
        clearInterval(timer);
    }
    timerDisplay.textContent = "";
}
/***************************************************** */