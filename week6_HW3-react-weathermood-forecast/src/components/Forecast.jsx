import React from 'react';
import PropTypes from 'prop-types';

import {getForecast} from 'api/open-weather-map.js';

import WeatherForm from 'components/WeatherForm.jsx';
import ForecastDisplay from 'components/ForecastDisplay.jsx';
import ForecastDisplay2 from 'components/ForecastDisplay2.jsx';

import {
    Row,
    Col
} from 'reactstrap';

import './weather.css';
import 'css/owfont-regular.css';
import Hidden from '@material-ui/core/Hidden';

export default class Forecast extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };
    static getInitWeatherState() {
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN
        };
    }

    static handleToday() {
        var d = new Date();
        switch ((d.getDay()+1)%7) {
            case 0: return 'Sun'; break;
            case 1: return 'Mon'; break;
            case 2: return 'Tue'; break;
            case 3: return 'Wed'; break;
            case 4: return 'Thr'; break;
            case 5: return 'Fri'; break;
            case 6: return 'Sat'; break;
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitWeatherState(),
            loading: false,
            masking: false
        };
        
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.maskInterval = null;
    }

    componentDidMount() {
        this.getForecastWeather('Hsinchu', 'metric');
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelWeather();
        }
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery} />
                    <ForecastDisplay2 idx={0} {...this.state}/>
                    <div>
                        <Row>
                            <Col></Col>
                            <Hidden smDown>
                                <ForecastDisplay idx={1} {...this.state}/>
                            </Hidden>
                            <ForecastDisplay idx={2} {...this.state}/>
                            <ForecastDisplay idx={3} {...this.state}/>
                            <Hidden smDown>
                                <ForecastDisplay idx={4} {...this.state}/>
                            </Hidden>
                            <Col></Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    getForecastWeather(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(weather => {
                this.setState({
                    ...weather,
                    loading: false
                }, () => this.notifyUnitChange(unit));
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        this.maskInterval = setInterval(() => {
            clearInterval(this.maskInterval);
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForecastWeather(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }

}
