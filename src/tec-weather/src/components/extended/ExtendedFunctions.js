import moment from 'moment';

export function parseForecasts(weather) {
    let forecastsByDate = {};
    weather.list.forEach((forecast, i) => {
        let keyDate = moment.unix(forecast.dt).format('YYYYMMDD');
        let value = {
            date: forecast.dt,
            temperature: forecast.main.temp,
            icon: forecast.weather[0].icon
        };

        if (forecastsByDate[keyDate]?.length) {
            forecastsByDate[keyDate].push(value);
        } else {
            forecastsByDate[keyDate] = [value];
        }
    });

    let parsedForecasts = [], position = 0;
    for (let key in forecastsByDate) {
        let icons = forecastsByDate[key].map(forecast => parseInt(forecast.icon.substring(0, 2)));
        let frequency = {}, worstCondition = 0, iconResult;

        for (let icon of icons) {
            frequency[icon] = (frequency[icon] || 0) + 1;
            if (frequency[icon] > worstCondition) {
                worstCondition = frequency[icon];
                iconResult = icon;
            }
        }

        parsedForecasts.push({
            icon: `${iconResult.toString().padStart(2, '0')}d`,
            date: moment.unix(forecastsByDate[key][0].date).format('ddd DD/MM'),
            maximum: (position === Object.keys(forecastsByDate).length - 1) && forecastsByDate[key].length < 4 ? '' : Math.max(...forecastsByDate[key].map(forecast => forecast.temperature)).toFixed(0),
            minimum: position === 0 && forecastsByDate[key].length < 4 ? '' : Math.min(...forecastsByDate[key].map(forecast => parseFloat(forecast.temperature))).toFixed(0)
        });

        position++;
    }
    console.log(parsedForecasts);
    return parsedForecasts;
    // verificar si hay al menos 4 registros del mismo dia.
    // si hay, informar. sino, descartar hasta encontrar siguiente.
    // tomar desde ahi como minimo 4 registros hasta el final. 
}