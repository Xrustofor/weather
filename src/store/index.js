import { createStore } from 'vuex';
import  {oneDay } from '../../api/base';

const store = createStore({
    state() {
        return {
            items: [],
            geolocation: null,
            header: [
                { key: "hour", value: "Година" },
                { key: "icon", value: "" },
                { key: "temp", value: "Температура" },
                { key: "feels_like", value: "Відчувається як" },
                { key: "pressure", value: "Тиск" },
                { key: "humidity", value: "Вологість" },
                { key: "dew_point", value: "Точка роси" },
                { key: "clouds", value: "Хмари" },
                { key: "wind_speed", value: "Швидкість вітру м/c" },
                { key: "wind_deg", value: "Напрямок вітру" },
                { key: "wind_gust", value: "Порив вітру" },
            ]
        }
    },
    getters:{
        getItems: state => state.items,
        getHeader: state => state.header,
        getStoreGeolocation: state => state.geolocation,
        getLocalGeolocation: () => {
            const json = localStorage.getItem('geolocation');
            return JSON.parse(json);
        },
    },
    mutations:{
        setOneData(store, payload){ store.items = payload },
        setCurentLocation(state, payload) {
            console.log(payload)
            if(!payload?.position) return;
            const { position, city } = payload;
            state.geolocation = {position, city};
            const json = JSON.stringify({position, city})
            console.log(json);
            localStorage.setItem("geolocation", json);
        },


    },
    actions:{
        async getOneDay({ commit }, payload){
            console.log(payload)
            const { lat, lon } = payload.position;
            commit('setCurentLocation', payload)
            try{
               const result = await oneDay({lat, lon});
               commit('setOneData', result);
             } catch(e){
                console.log(e)
             }
            
        },
        getCurrentGeolocation({commit}){
            const data = {
                cod: null,
                city: '',
            }
            if(!navigator.geolocation){
                data.cod = 200,
                data.message = "Geolocation is not supported by this browser."
                commit('setCurentLocation', data)
            }
            navigator.geolocation.getCurrentPosition((position) => {
                data.cod = 200,
                data.position = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
                commit('setCurentLocation', data)
            });
        },
        
    },
})


export default store