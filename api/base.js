import { http } from './http';
import axios from 'axios';

const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER || ''

const curentDate = (new Date(new Date().toDateString()).getTime() / 1000) - (2*60*60);

export const oneDay = async (q) => {
    const params = {
        ...q,
        lang: 'ua',
        units: 'metric',
        dt: curentDate,
        appid: apiKeyWeather
    }

    return http.get('/onecall/timemachine', { params }).then((data)=> {
        return data.hourly.map((item) => {
            const description = item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1);
            return {
                hour: new Date(item.dt * 1000).getHours(),
                temp: item.temp,
                feels_like: Math.round(item.feels_like, 1),
                pressure: item.pressure,
                humidity: item.humidity,
                dew_point: item.dew_point,
                clouds: item.clouds,
                wind_speed: item.wind_speed,
                wind_deg: item.wind_deg,
                wind_gust: item.wind_gust || '',
                description,
                icon: item.weather[0].icon,
            }
        })
    })
    
}


const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/city',
    params: {
        name: 'Vinn',
        limit: '25'
    },
    headers: {
        'X-Api-Key': 'yz/xPn9O34dk19wl5r5mRQ==W4jnOQbGRdFHKcKz'
    }
}
export const fetchCitys = async (text) => {
    options.params.name = text;
    return http.request(options);
}

