import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/lesson/:id",
    name: "view-lesson",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewLesson.vue"),
  },
  {
    path: "/add",
    name: "add-lesson",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddLesson.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
