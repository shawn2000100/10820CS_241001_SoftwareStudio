import React from 'react';
import PropTypes from 'prop-types';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {getWeather} from 'api/open-weather-map.js';

import './weather.css';

export default class Today extends React.Component {
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

    constructor(props) {
        super(props);

        this.state = {
            ...Today.getInitWeatherState(),
            loading: true,
            masking: true
        };

        this.handleFormQuery = this.handleFormQuery.bind(this);
    }

    componentDidMount() {
        this.getWeather('Hsinchu', 'metric');
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // this.setState({
        //     unit: nextProps.unit
        // }, ()=>{});
        this.setState({
            unit: nextProps.unit,
            city: nextProps.city
        }, () => {this.getWeather(this.props.city, this.props.unit);})
    }

    render() {
        return (
            <div className={`today weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherDisplay {...this.state}/>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );
    }

    getWeather(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getWeather(city, unit).then(weather => {
                this.setState({
                    ...weather,
                    loading: false
                });
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...Today.getInitWeatherState(unit),
                    loading: false
                });
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.props.onQuery(city, unit);
        this.getWeather(city, unit);
    }
}
