const initUnitState = 'metric';

export function unit(state = initUnitState, action) {
    switch (action.type) {
        case '@UNIT/SET_UNIT':
            return action.unit;
        default:
            return state;
    }
}

const initWeatherState = {
    city: 'na',
    code: -1,
    group: 'na',
    description: 'N/A',
    temp: NaN,
    weatherLoading: false,
    masking: false
};

export function weather(state = initWeatherState, action) {
    switch (action.type) {
        case '@WEATHER/START_GET_WEATHER':
            return {
                ...state,
                city: action.city, // set city state immediately to prevent input text (in WeatherForm) from blinking
                weatherLoading: true
            };
        case '@WEATHER/END_GET_WEATHER':
            return {
                ...state,
                city: action.city,
                code: action.code,
                group: action.group,
                description: action.description,
                temp: action.temp,
                weatherLoading: false
            };
        case '@WEATHER/MASK_TODAY_BG':
            return {
                ...state,
                masking: true
            };
        case '@WEATHER/UNMASK_TODAY_BG':
            return {
                ...state,
                masking: false
            };
        case '@WEATHER/RESET_WEATHER':
            return {
                ...initWeatherState,
                masking: state.masking
            };
        default:
            return state;
    }
}

const initWeatherFormState = {
    inputValue: null,
    formToggle: false,
    tempToggle: false,
    unit: null
};

export function weatherForm(state = initWeatherFormState, action) {
    switch (action.type) {
        case '@WEATHER_FORM/TOGGLE_FORM':
            return {
                ...state,
                formToggle: !state.formToggle
            };
        case '@WEATHER_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@WEATHER_FORM/TOGGLE_TEMP':
            return {
                ...state,
                tempToggle: !state.tempToggle
            };
        case '@WEATHER_FORM/SELECT_UNIT':
            return {
                ...state,
                unit: action.unit
            };
        default:
            return state;
    }
}

function getInitForecastState() {
    let list = [];
    for (let i = 0; i < 5; i++) {
        list[i] = {
            ts: -i,
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN
        };
    }
    return {
        city: 'na',
        list,
        forecastLoading: false,
        masking: false
    };
}

export function forecast(state = getInitForecastState(), action) {
    switch (action.type) {
        case '@FORECAST/START_GET_FORECAST':
            return {
                ...state,
                city: action.city, // set city state immediately to prevent input text (in WeatherForm) from blinking
                forecastLoading: true
            };
        case '@FORECAST/END_GET_FORECAST':
            return {
                ...state,
                city: action.city,
                list: action.list,
                forecastLoading: false
            };
        case '@FORECAST/MASK_FORECAST_BG':
            return {
                ...state,
                masking: true
            };
        case '@FORECAST/UNMASK_FORECAST_BG':
            return {
                ...state,
                masking: false
            };
        case '@FORECAST/RESET_FORECAST':
            return {
                ...getInitForecastState(),
                masking: state.masking
            };
        default:
            return state;
    }
}
