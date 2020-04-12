import Component from './component.js';
import Mode from './mode.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.brand = root.querySelector('.brand');
        this.reset();

        this.mode = 'Easy';
        this.modes = root.querySelectorAll(Mode.getRootClass());
        this.modes[0].addEventListener("click", this.initEasyMode.bind(this));
        this.modes[1].addEventListener("click", this.initHardMode.bind(this));
        this.modes[2].addEventListener("click", this.initNightmareMode.bind(this));
    }

    initEasyMode() {
        this.mode = 'Easy';

        for(let m of this.modes){
            m.classList.remove("selected");
        }
        this.modes[0].classList.add("selected");

        this.fire('chmod', this.mode);
    }
    
    initHardMode() {
        this.mode = 'Hard';

        for(let m of this.modes){
            m.classList.remove("selected");
        }
        this.modes[1].classList.add("selected");

        this.fire('chmod', this.mode);
    }
    
    initNightmareMode() {
        this.mode = 'Nightmare';

        for(let m of this.modes){
            m.classList.remove("selected");
        }
        this.modes[2].classList.add("selected");

        this.fire('chmod', this.mode);
    }

    reset() {
        // do nothing
    }
}