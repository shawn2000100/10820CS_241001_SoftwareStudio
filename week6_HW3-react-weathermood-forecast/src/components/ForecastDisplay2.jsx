import React from 'react';
import PropTypes from 'prop-types';

import './ForecastDisplay2.css';

export default class ForecastDisplay2 extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.array,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`weather-display ${this.props.masking? 'masking' : ''}`}>
                <p className='description'>{'Tomorrow:' + this.props.description}</p>&nbsp;
                <img src={`images/w-${this.props.group}.png`}/>
                <h1 className='temp'>
                    <span className='display-3'>{Math.round(this.props.temp[(this.props.idx || 0)])}&ordm;</span>
                    &nbsp;{(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'}
                </h1>
            </div>
        );
    }
}
