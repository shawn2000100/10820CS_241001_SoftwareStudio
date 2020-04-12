import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('chmod', this.handleChmod.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());
        this.board.on('timeout', this.handleBoardTimeout.bind(this));
        this.board.on('blink', this.handleBoardBlink.bind(this));

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        
        this.board.clearTimer();
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleBoardTimeout(firer){
        this.root.style.backgroundColor = this.deck.getPickedColor();
        
        this.board.clearTimer();
        this.board.showTimeoutMessage();
        this.deck.gameOverFadeInCards();
        this.reset.showPlayAgain();
    }

    handleBoardBlink(firer){
        this.root.style.background = "white";
        setTimeout(() => {this.root.style.background = "#232323"}, 70);
    }

    handleRestClick(firer) {
        this.root.style.backgroundColor = "#232323";

        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        this.reset.reset();

        if(this.navbar.mode === 'Nightmare'){
            this.reset.hidePlayAgain();
            this.board.setTimer();
        }
    }

    handleChmod(firer, mode){
        this.board.clearTimer();
        this.deck.chmod(mode);
        this.handleRestClick();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
