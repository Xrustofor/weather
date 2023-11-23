import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Chosen from "../views/Chosen.vue";
import Places from "../views/Places.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chosen",
    name: "Chosen",
    component: Chosen,
  },
  {
    path: "/places",
    name: "Places",
    component: Places,
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;