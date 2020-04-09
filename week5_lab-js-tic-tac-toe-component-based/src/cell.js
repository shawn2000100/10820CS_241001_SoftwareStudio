import Component from  './component.js';

import './cell.css';

export default class Cell extends Component {
    static getRootClass() {
        return '.cell';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
    }

    handleDomClick(e) {
        this.fire('cellClick');
    }

    reset() {
        this.root.textContent = ""
    }

    occupyCell(x) {
        this.root.textContent = x;
    }

    isOccupied() {
        if(this.root.textContent !== "")
            return true;
        else
            return false;
    }

    isMatch(x) {
        return this.root.textContent === x;
    }
}
