import {
    getWeather as getWeatherFromApi,
    cancelWeather,
    getForecast as getForecastFromApi,
    cancelForecast
} from 'api/open-weather-map.js';

/*  Unit */

function setUnit(unit) {
    return {
        type: '@UNIT/SET_UNIT',
        unit: unit
    };
}

/* Today */

function startGetWeather(city, unit) {
    return {
        type: '@WEATHER/START_GET_WEATHER',
        city,
        unit
    };
}

function endGetWeather(city, code, group, description, temp) {
    return {
        type: '@WEATHER/END_GET_WEATHER',
        city,
        code,
        group,
        description,
        temp,
    };
}

function resetWeather() {
    return {
        type: '@WEATHER/RESET_WEATHER'
    };
}

function maskTodayBg() {
    return {
        type: '@WEATHER/MASK_TODAY_BG'
    };
}

function unmaskTodayBg() {
    return {
        type: '@WEATHER/UNMASK_TODAY_BG'
    };
}

export function getWeather(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetWeather(city, unit));

        dispatch(maskTodayBg());
        setTimeout(() => {
            dispatch(unmaskTodayBg());
        }, 600);

        return getWeatherFromApi(city, unit).then(weather => {
            const {city, code, group, description, temp, unit} = weather;
            dispatch(endGetWeather(city, code, group, description, temp));
            dispatch(setUnit(unit));
        }).catch(err => {
            console.error('Error getting weather', err);
            dispatch(resetWeather());
        });
    };
};

/* WeatherForm */

export function toggleForm() {
    return {
        type: '@WEATHER_FORM/TOGGLE_FORM'
    };
}

export function input(value) {
    return {
        type: '@WEATHER_FORM/INPUT',
        value
    };
}

export function toggleTemp() {
    return {
        type: '@WEATHER_FORM/TOGGLE_TEMP'
    };
}

export function selectUnit(unit) {
    return {
        type: '@WEATHER_FORM/SELECT_UNIT',
        unit
    };
}

/* Forecast */

function startGetForecast(city, unit) {
    return {
        type: '@FORECAST/START_GET_FORECAST',
        city,
        unit
    };
}

function endGetForecast(city, list) {
    return {
        type: '@FORECAST/END_GET_FORECAST',
        city,
        list
    };
}

function resetForecast() {
    return {
        type: '@FORECAST/RESET_FORECAST'
    };
}

function maskForecastBg() {
    return {
        type: '@FORECAST/MASK_FORECAST_BG'
    };
}

function unmaskForecastBg() {
    return {
        type: '@FORECAST/UNMASK_FORECAST_BG'
    };
}

export function getForecast(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetForecast(city, unit));

        dispatch(maskForecastBg());
        setTimeout(() => {
            dispatch(unmaskForecastBg());
        }, 600);

        return getForecastFromApi(city, unit).then(forecast => {
            const {city, list, unit} = forecast;
            dispatch(endGetForecast(city, list));
            dispatch(setUnit(unit));
        }).catch(err => {
            console.error('Error getting forecast', err);
            dispatch(resetForecast());
        });
    };
};
