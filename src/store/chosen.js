import { LSGeolocation } from "../scripts/index"
import { apiAllOneDay, apiWeek, apiOneDay } from "../../api/base"
const lSgeolocation = new LSGeolocation();
import {CONSTANTS} from "../consts"

export const chosen = {
    namespaced: true,
    state: () => ({ 
        geolocations: [],
        items: [],
    }),
    getters:{
        getGeolocations: state => state.geolocations,
        getItems: state => state.items,
    },
    mutations: {
        setGeolocations: (state) => state.geolocations = lSgeolocation.data,
        setAllItems: (state, payload) => state.items = payload,
        updateAllItems: (state, payload) => {
            const {uuid, items, chartKey, typeView} = payload;
            state.items = state.items.map(item => {
                if(item.uuid === uuid){
                    item.items = items
                    item.chartKey = chartKey || null
                    item.typeView = typeView
                }
                return item
            })
        },
        removeCityItems: ( state, uuid ) => state.items = state.items.filter(item => item.uuid !== uuid),
        
    },
    
    actions: { 
        async getAllOneDay({commit}, payload){
            try{
                const result = await apiAllOneDay(payload);
                const data = payload.map((p, index) => ({
                    city: p.city,
                    uuid: p.uuid,
                    items: result[index],
                    typeView: CONSTANTS.HOUR              
                }))
                commit('setAllItems', data)
                return data;
            }catch(e){
                console.log(e)
            }
        },
        async getWeekChosen({ commit, getters }, payload){
            const {uuid} = payload;
            const geolocations = getters.getGeolocations
            const candidate = geolocations.find(g => g.uuid === uuid);
            if(!candidate) return null;

            const { lat, lon } = candidate.position;
            try{
                const items = await apiWeek({ lat, lon })
                commit('updateAllItems', {items,  uuid, typeView: CONSTANTS.DAY })
            }catch(e){
                console.log(e)
            }
        },
        async getOneDayChosen({ commit, getters }, payload){
            const {uuid} = payload;
            const chartKey = new Date().getTime();
            const geolocations = getters.getGeolocations
            const candidate = geolocations.find(g => g.uuid === uuid);
            if(!candidate) return null;
            const { lat, lon } = candidate.position;
            try{
                const items = await apiOneDay({ lat, lon })
                commit('updateAllItems', {items,  uuid, chartKey, typeView: CONSTANTS.HOUR })
            }catch(e){
                console.log(e)
            }
        },
        removeCity({commit}, uuid){
            const resulet = lSgeolocation.delete(uuid);
            if(resulet){
                commit('setGeolocations');
                commit('removeCityItems', uuid);
                return true;
            }
        }
    },
}