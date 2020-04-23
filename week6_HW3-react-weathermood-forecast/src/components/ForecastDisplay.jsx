import React from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'reactstrap';

import './ForecastDisplay.css';
import 'css/owfont-regular.css';

export default class ForecastDisplay extends React.Component {
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
            <Col xs='auto' className={`forecast-display  ${this.props.masking ? 'masking' : ''} `}>
                <div className=''>
                    <span className='date'>{this.handleDate()+':'}</span>
                    <span className='temp'>{Math.round(this.props.temp[this.props.idx || 0])}&ordm;</span>
                    <i className={`icon owf owf-2x owf-${this.props.code[this.props.idx || 0]}${(Math.abs(this.props.code[this.props.idx || 0] - 801) == 1) ? "-d" : ""}`} ></i>
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
