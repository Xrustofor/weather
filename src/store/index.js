import { createStore } from 'vuex';
import  { apiOneDay, apiWeek } from '../../api/base';

const store = createStore({
    state() {
        return {
            items: [],
            geolocation: null,
            header: [
                { key: "time", value: "Година/День" },
                { key: "icon", value: "" },
                { key: "temp", value: "Температура" },
                { key: "feels_like", value: "Відчувається як" },
                { key: "pressure", value: "Тиск" },
                { key: "humidity", value: "Вологість" },
                { key: "clouds", value: "Хмари" },
                { key: "wind_speed", value: "Швидкість вітру м/c" },
                { key: "wind_deg", value: "Напрямок вітру" },
                { key: "wind_gust", value: "Порив вітру" },
            ]
        }
    },
    getters:{
        getItems: state => state.items,
        getweekItems: state => state.weekItems,
        getHeader: state => state.header,
        getStoreGeolocation: state => state.geolocation,
    },
    mutations:{
        setOneData(state, payload){ state.items = payload },
        setWeek(state, payload){ state.items = payload },
        setCurentLocation(state, payload) {
            if(!payload?.position) return;
            const { position, city } = payload;
            state.geolocation = {position, city};
            const json = JSON.stringify({position, city})
            localStorage.setItem("geolocation", json)
        },

    },
    actions:{
        async getOneDay({ commit }, payload){
            const { lat, lon } = payload.position;
            try{
               const result = await apiOneDay({lat, lon});
               commit('setOneData', result);
             } catch(e){
                console.log(e)
             }
            
        },

        async getWeek({ commit }, payload){
            const { lat, lon } = payload.position;
            try{
                const result = await apiWeek({ lat, lon })
                commit('setWeek', result)
            }catch(e){
                console.log(e)
            }
        },

        saveCurentLocation({commit}){
            const str = localStorage.getItem('geolocation');
            if(!str) return;
            const json = JSON.parse(str)
            commit('setCurentLocation', json)
            return json
        },

        getCurrentGeolocation({commit}){
            const data = {
                cod: null,
                city: '',
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              };
              
              const success = pos => {
                const crd = pos.coords;
                const {latitude, longitude, accuracy} = crd;
                data.message = `More or less ${accuracy} meters.`;
                data.cod = 200,
                data.position = {
                    lat: latitude,
                    lon: longitude
                }
                commit('setCurentLocation', data);
              }
              
              const error = err => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
                data.cod = err.code;
                data.message = err.message;
                console.log(err)
                commit('setCurentLocation', data);
              }
              
              navigator.geolocation.getCurrentPosition(success, error, options);

              return data;
        },
        
    },
})


export default store