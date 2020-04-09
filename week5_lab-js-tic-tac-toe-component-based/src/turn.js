import Component from  './component.js';

import './turn.css';

export default class Turn extends Component {
    static getRootClass() {
        return '.turn';
    }

    constructor(root) {
        super(root);
    }

    setTurn(x) {
        this.root.textContent = x;
    }
}
