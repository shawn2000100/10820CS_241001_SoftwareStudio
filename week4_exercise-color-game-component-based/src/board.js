import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);

        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.timerDisplay = root.querySelector('.timer');
        this.timerID = 0;
        this.seconds = 3;
        this.reset(color);
    }

    reset(color) {
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        this.clearTimer();
        this.seconds = 3;
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = "Correct!";
    }

    showWrongMessage() {
        this.messageDisplay.textContent = "Try Again";
    }

    showTimeoutMessage() {
        this.messageDisplay.textContent = "TIMEOUT!";
    }

    setTimer(){
        this.timerDisplay.textContent = '  ' + this.seconds;

        console.log("before set timer")
        console.log(this.timerID);
        this.timerID = setInterval(function() {        
            this.seconds = this.seconds - 1;
            this.timerDisplay.textContent = '  ' + this.seconds;
            // if(seconds >= 1){
            //     body.style.background = "white";
            //     setTimeout(( () => body.style.background = "#232323" ), 70);
            // }
            if (this.seconds <= 0){
                this.fire('timeout');
                console.log(this);
            }
        }.bind(this), 1000);

        console.log("After set timer")
        console.log(this.timerID);
    }

    clearTimer(){
        if(this.timerID){
            clearInterval(this.timerID);
            this.timerID = -1;
        }
        this.timerDisplay.textContent = "";
    }
}
