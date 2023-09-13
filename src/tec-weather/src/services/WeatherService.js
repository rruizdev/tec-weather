import axios from 'axios';

const apiKey = 'myApiKey';

export async function getBy(latitud, longitud) {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric&lang=es`);
}