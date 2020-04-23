import React from 'react';
import ReactDOM from 'react-dom';

import Main from 'components/Main.jsx';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    ReactDOM.render(
        <Main />,
        document.getElementById('root')
    );
};
