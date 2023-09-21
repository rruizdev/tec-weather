import axios from 'axios';
import environment from '../configurations/environment.json';

export const getLocation = async (query) => {
    return axios.get(environment.location.endpoints.geocoding, {
        params: {
            q: query,
            limit: 5,
            appid: environment.key.openWeatherMap
        }
    });
}