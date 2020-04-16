import React from 'react';
import PropTypes from 'prop-types';

import './WeatherDisplay.css';

export default class WeatherDisplay extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
                <img src={`images/w-${this.props.group}.png`}/>
                <p className='description'>{this.props.description}</p>&nbsp;
                <h1 className='temp'>
                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                    &nbsp;{(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'}
                </h1>
            </div>
        );
    }
}
