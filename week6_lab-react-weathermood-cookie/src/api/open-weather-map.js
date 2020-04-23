import axios from 'axios';

// TODO replace the key with yours
const key = 'b3afe9493ec0ff8c6abd278665046f76';
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const baseForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}`;

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

// JC add
export function getForecast(city, unit) {
    // TODO
    var url = `${baseForecastUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, { cancelToken: weatherSource.token }).then(function (res) {
        if (res.data.cod !== 200) {
            console.log("getForecast Error Code: ", res.data.cod);
            throw new Error(res.data.messages);
        } else {
            // JC test:
            console.log("getForecast success: ", res)
            return {
                city: capitalize(city),
                code: [
                    res.data.list[1].weather[0].id,
                    res.data.list[2].weather[0].id,
                    res.data.list[3].weather[0].id,
                    res.data.list[4].weather[0].id,
                    res.data.list[5].weather[0].id
                ],
                group: getWeatherGroup(res.data.list[0].weather[0].id),
                description: res.data.list[0].weather[0].description,
                temp: [
                    res.data.list[1].main.temp,
                    res.data.list[2].main.temp,
                    res.data.list[3].main.temp,
                    res.data.list[4].main.temp,
                    res.data.list[5].main.temp
                ],
                unit: unit // or 'imperial'
            };
        }
    }).catch(function (err) {
        console.log("getForecase catch err", err)
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelForecast() {
    // TODO
    weatherSource.cancel('Request canceled');
}
