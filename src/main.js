import { createApp, } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router/';
import store from './store';
import VueGoogleMaps, {} from '@fawmi/vue-google-maps';

const apiKeyGoogle= import.meta.env.VITE_API_KEY_GOOGLE || ''
const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: apiKeyGoogle,
        libraries: "places",
        language: 'ua',
    },
})


app.use(store);
app.use(router)

app.mount('#app')

