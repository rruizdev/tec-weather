import axios from 'axios';
import environment from '../configurations/environment.json';

export async function getLocation(query) {
    return axios.get(environment.location.endpoints.geocoding, {
        params: {
            q: query,
            limit: 1,
            appid: environment.key.openWeatherMap
        }
    });
}