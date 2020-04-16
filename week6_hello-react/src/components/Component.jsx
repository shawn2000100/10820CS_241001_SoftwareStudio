import React from 'react';

import './Component.css';

export default class Component extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='component'>
                <h2>Countdown: {this.props.count}</h2>
                <button onClick={this.props.onReset}>Reset</button>
            </div>
        );
    }

}
