import React from 'react';
import PropTypes from 'prop-types';

// JC add
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherForecast from 'components/WeatherForecast.jsx';
import {cancelWeather, getForecast} from 'api/open-weather-map.js';
import {
    Row,
    Col
} from 'reactstrap';

import './weather.css';

export default class Forecast extends React.Component {
    // jc
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    // jc
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
            loading: false,
            masking: false,
            ...Forecast.getInitWeatherState(),
        };
        
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.maskInterval = null;
    }

    // jc
    componentDidMount() {
        this.getForecastWeather('Hsinchu', 'metric');
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelWeather();
        }
    }

    // jc
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

    render() {
        // return (
        //     <div className={`forecast weather-bg ${this.state.group}`}>
        //         <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
        //             <h1 className='text-center'>Forecast (unit: {this.props.unit})</h1>
        //         </div>
        //     </div>
        // );

        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherDisplay {...this.state}/>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );

        // return (
        //     <div className={`forecast weather-bg ${this.state.group}`}>
        //         <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
        //             <WeatherDisplay idx={0} {...this.state} />
        //             <div className='w-25 mx-auto display-4 text-right font-white'>{Forecast.handleToday()}</div>
        //             <div>
        //                 <Row className='w-50 mx-auto'>
        //                     <WeatherForecast idx={1} {...this.state}/>
        //                     <WeatherForecast idx={2} {...this.state}/>
        //                     <WeatherForecast idx={3} {...this.state}/>
        //                     <WeatherForecast idx={4} {...this.state}/>
        //                 </Row>
        //             </div>
        //             <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery} />
        //         </div>
        //     </div>
        // );
    }

    // jc
    getForecastWeather(city, unit, cnt=1) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit, cnt).then(weather => {
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
        this.props.onQuery(city, unit);
        this.getForecastWeather(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }

}
