import Component from  './component.js';

import './card.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Card extends Component {
    static getRootClass() {
        return '.card';
    }

    static randomColor() {
        //pick a "red" from 0 - 255
        var r = Math.floor(Math.random() * 256);
        //pick a "green" from  0 -255
        var g = Math.floor(Math.random() * 256);
        //pick a "blue" from  0 -255
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        this.reset();
    }

    reset() {
        this.color = Card.randomColor();
        this.fadeIn(this.color);
    }

    getColor() {
        return this.color;
    }

    fadeOut() {
        this.root.style.opacity = 0;
    }

    fadeIn(color) {
        this.root.style.backgroundColor = color;
        this.root.style.opacity = 1;
    }

    handleDomClick(e) {
        this.fire('click', this.color);
    }
}
