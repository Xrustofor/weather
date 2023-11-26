import { LSGeolocation } from "../scripts/index"
const lSgeolocation = new LSGeolocation();

export const chosen = {
    namespaced: true,
    state: () => ({ 
        geolocations: []
    }),
    getters:{
        getGeolocations: state => state.geolocations,
    },
    mutations: {
        setGeolocations(state){
            state.geolocations = lSgeolocation.data;
            
            console.log(state.geolocations);
       }
     },
    
    actions: { 
        
    },
}