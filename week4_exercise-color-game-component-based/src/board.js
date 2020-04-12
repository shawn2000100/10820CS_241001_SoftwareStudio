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
        this.seconds = 5;
        this.reset(color);
    }

    reset(color) {
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        this.clearTimer();
        this.timerID = 0;
        this.seconds = 5;
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

        this.timerID = setInterval(function() {        
            this.seconds = this.seconds - 1;
            this.timerDisplay.textContent = '  ' + this.seconds;
            if(this.seconds >= 1){
                this.fire('blink');
            }
            if (this.seconds <= 0){
                this.fire('timeout');
            }
        }.bind(this), 1000);
    }

    clearTimer(){
        if(this.timerID){
            clearInterval(this.timerID);
        }
        this.timerDisplay.textContent = "";
    }
}
