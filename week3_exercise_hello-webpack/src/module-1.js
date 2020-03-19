import _ from 'lodash';
import './module-1.css'


export default function(){
  var el = document.querySelector('#module-1');
  el.textContent = _.join(['Module','1'],' ');
}

export var n = 100;
