import React from 'react';
import ReactDOM from 'react-dom';

import Main from 'components/Main.jsx';
import { CookiesProvider} from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

window.onload = function() {
    ReactDOM.render(
        <CookiesProvider><Main/></CookiesProvider>,
        document.getElementById('root')
    );
};
