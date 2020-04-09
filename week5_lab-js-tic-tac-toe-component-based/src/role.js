import Component from  './component.js';

import './role.css';

export default class Role extends Component {
    static getRootClass() {
        return '.role';
    }

    constructor(root, color) {
        super(root);

        this.score = 0;
    }

    reset() {
        this.score = 0;
        this.root.textContent = "-";
    }

    setScore() {
        // TODO:
        // In this function, you should record the role's score and update the textContent.
        this.score++;
        this.root.textContent = this.score;
    }
}
