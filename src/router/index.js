import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Chosen from "../views/Chosen.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Головна" },
    component: Home,
  },
  {
    path: "/chosen",
    name: "Chosen",
    meta: { title: "Обране" },
    component: Chosen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const documentTitle = to.meta.title ? `${to.meta.title} | ` : "";
  document.title = `${documentTitle}Weather`;
  next()
})

export default router;