import React from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'reactstrap';

import './WeatherForecast.css';
// import './owfont-master/css/owfont-regular.css';

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
            <Col className={`forecast-display  ${this.props.masking ? 'masking' : ''} ${(this.props.idx > 2) ? 'd-none d-sm-block' : 'd-block' }`}>
                <i className={`icon owf owf-3x owf-${this.props.code[this.props.idx || 0]}${(Math.abs(this.props.code[this.props.idx || 0] - 801) == 1) ? "-d" : ""}`} ></i>
                <div className='date'>{this.handleDate()}</div>
                <div className='temp'>
                    <span>{Math.round(this.props.temp[this.props.idx || 0])}&ordm;</span>
                    &nbsp;{(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'}
                </div>
            </Col>
        );
    }

    handleDate() {
        var d = new Date();
        switch ((this.props.idx +1+ d.getDay())%7) {
            case 0: return 'Sun'; break;
            case 1: return 'Mon'; break;
            case 2: return 'Tue'; break;
            case 3: return 'Wed'; break;
            case 4: return 'Thr'; break;
            case 5: return 'Fri'; break;
            case 6: return 'Sat'; break;
        }
    }
}
