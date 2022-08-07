

import { deshboard } from './pages/deshboard.js';
import {main} from './pages/main.js';
import { bottom } from './pages/bottom.js';

const manager  = document.getElementsByClassName('manager')[0];
console.log(manager);
manager.appendChild(deshboard);
manager.appendChild(main);
manager.appendChild(bottom);













