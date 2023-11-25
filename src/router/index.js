import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Chosen from "../views/Chosen.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;