import {m1, m2, n} from './module-1.js';
import m3 from './module-2.js';

window.onload = function(){
    console.log(n);
    m1();
    m3();
    m2();
}
