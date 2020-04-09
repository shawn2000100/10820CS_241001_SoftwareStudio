// TODO:
// In this js-file, you should define a new component "Reset" extending from "Component" and import its css-file.
// Besides, in the component, you shold fire a event if this button is clicked.
import Component from './component.js';

import './reset.css';

export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleResetClick.bind(this));
        // console.log("test, reset.js constructor")
        this.resetDisplay = root.querySelector(".reset span");
    }

    reset() {
        this.resetDisplay.textContent = "RESTART GAME";
    }
    
    handleResetClick(e) {
        this.fire('reset');
        this.reset();
        // console.log("test reset.js")
    }

}
