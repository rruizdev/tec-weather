import axios from 'axios';
import environment from '../configurations/environment.json';

export async function getTodayBy(latitude, longitude) {
  return axios.get(environment.weather.endpoints.today + `?lat=${latitude}&lon=${longitude}&appid=${environment.weather.api_key}&units=metric&lang=es`);
}

export async function getExtendedBy(latitude, longitude) {
  return axios.get(environment.weather.endpoints.extended + `?lat=${latitude}&lon=${longitude}&appid=${environment.weather.api_key}&units=metric&lang=es`);
}

export function getOrientation(degrees) {
  const orientations = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  return orientations[Math.round(degrees / (360 / orientations.length)) % orientations.length];
}