import _ from 'lodash';
import './module-1.css'


export function m1(){
  var el = document.querySelector('#module-1');
  el.textContent = _.join(['Module','1'],' ');
}

export function m2(){
  var el = document.querySelector('#module-1-2');
  el.textContent = _.join(['Module','1-2'],' ');
}

export var n = 100;


