import { createStore } from 'vuex';
import  { apiOneDay, apiWeek, fetchCitys } from '../../api/base';
import { LSGeolocation } from "../scripts/index"
const lSgeolocation = new LSGeolocation();
import { NUMBER_CITIES, TYPE, SHOW_TIME } from "../consts";
import {chosen} from "./chosen"

const store = createStore({
    modules:{
        chosen
    },
    state() {
        return {
            loading: false,
            items: [],
            citys: [],
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
        citys: state => state.citys,
        getweekItems: state => state.weekItems,
        getHeader: state => state.header,
        getStoreGeolocation: state => state.geolocation,
        getLoading: state => state.loading,
    },
    mutations:{
        setLoading: (state, payload) => { state.loading = payload },
        setCitys( store, payload ){ store.citys = payload },
        setOneData(state, payload){ state.items = payload },
        setWeek(state, payload){ state.items = payload },
        setCurentLocation(state, payload) {
            if(!payload?.position) return;
            state.geolocation = payload;
            const json = JSON.stringify(payload)
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
        
        saveGeolocation({}, payload){
            const data = {
                type: TYPE.INFO,
                message: "",
                time: SHOW_TIME,
            };

            if(payload === null){
                data.type = TYPE.ERROR;
                data.message = `Спочатку виберіть місто`;
                return data
            }
            
            const countCities = lSgeolocation.length;

            if(countCities >= NUMBER_CITIES){
                data.type = TYPE.ERROR;
                data.message = `Ви не можете в обране добавити більше ${countCities} міст`;
                return data;
            }

            const islocations = lSgeolocation.isEl(payload);

            switch(islocations){
                case null: {
                    const result = lSgeolocation.save(payload);
                      if(result){
                        data.type = TYPE.SUCCESSES;
                        data.message = `${payload.city} добавлена в обране`;
                        return data;
                    }
                }
                case true: {
                    data.type = TYPE.WARNING;
                    data.message = `Місто ${payload.city} вже добавлений в обраное`;
                    return data;
                }
                case false: {
                    const result = lSgeolocation.save(payload);
                    if(result){
                        data.type = TYPE.SUCCESSES;
                        data.message = `${payload.city} добавлена в обране`;
                        return data;
                    }
                }
            }
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

        async getCitys({commit}, text){
            if(!text) return;
            commit('setCitys', []);
            try{
                commit('setLoading', true);
                const result = await fetchCitys(text);
                commit('setLoading', false);
                commit('setCitys', result);
            }catch(e){
                console.log(e);
                commit('setLoading', false);
            }
        }
        
    },
})




export default store