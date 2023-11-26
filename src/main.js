import { createApp, } from 'vue';
import VueAxios from 'vue-axios';
import axios from '../api/http';
import './styles/style.css';
import App from './App.vue';
import router from './router/';
import store from './store';
import VueGoogleMaps, {} from '@fawmi/vue-google-maps';
import Vue3ProgressBar from "@ctechhindi/vue3-progress-bar";



const apiKeyGoogle= import.meta.env.VITE_API_KEY_GOOGLE || ''
const app = createApp(App);
app.use(VueAxios, axios);
app.use(VueGoogleMaps, {
    load: {
        key: apiKeyGoogle,
        libraries: "places",
        language: 'ua',
    },
})

app.use(Vue3ProgressBar, {
    height: "2px",
  customStyle: {
    width: "100 %",
    position: "absolute",
    background: "#f8f3d6",
  },
})

app.use(store);
app.use(router);


app.mount('#app')

