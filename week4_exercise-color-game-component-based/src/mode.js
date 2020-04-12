import Component from './component.js';

import './mode.css';


export default class Mode extends Component {
    static getRootClass() {
        return '.mode';
    }

    constructor(root) {
        super(root);
    }
}