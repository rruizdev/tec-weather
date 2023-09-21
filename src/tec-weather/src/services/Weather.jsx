import axios from 'axios';
import environment from '../configurations/environment.json';

export const getTodayBy = async (latitude, longitude) => {
  return axios.get(environment.weather.endpoints.today, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: environment.key.openWeatherMap,
      units: 'metric',
      lang: 'es'
    }
  });
}

export const getExtendedBy = async (latitude, longitude) => {
  return axios.get(environment.weather.endpoints.extended, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: environment.key.openWeatherMap,
      units: 'metric',
      lang: 'es'
    }
  });
}