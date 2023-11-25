import { http } from './http';

const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER || ''

const curentDate = (new Date(new Date().toDateString()).getTime() / 1000) - (2*60*60);

export const apiOneDay = async (q) => {
    const params = {
        ...q,
        lang: 'ua',
        units: 'metric',
        dt: curentDate,
        appid: apiKeyWeather
    }

    return await http.get('/onecall/timemachine', { params }).then((data)=> {
        return data.hourly.map((item) => {
            const description = item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1);
            return {
                time: new Date(item.dt * 1000).getHours() + ':00',
                temp: item.temp,
                feels_like: Math.round(item.feels_like, 1),
                pressure: item.pressure,
                humidity: item.humidity,
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

export const apiWeek = async (q) => {
    const params = {
        ...q,
        lang: 'ua',
        units: 'metric',
        dt: 5,
        appid: apiKeyWeather
    }

    return await http.get('/forecast', { params }).then((data)=> {
        return data.list.map((item) => {
            const description = item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1);
            return {
                time: new Date(item.dt_txt).getUTCDate(),
                temp: item.main.temp,
                feels_like: Math.round(item.main.feels_like, 1),
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                clouds: item.clouds.all,
                wind_speed: item.wind.speed,
                wind_deg: item.wind.deg,
                wind_gust: item.wind.gust || '',
                description,
                icon: item.weather[0].icon,
            }
        })
    })
    
}
