import Vue from "vue";
import Router from "vue-router";
import WelcomePage from "./views/Welcome.vue";
import store from "@/store/store.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "WelcomePage",
      component: WelcomePage
    },
    {
      path: "/signup",
      name: "signup",
      beforeEnter(to, from, next) {
        if (!store.state.idToken) {
          next();
        } else {
          next("/");
        }
      },
      component: () => import("@/components/auth/SignUp")
    },
    {
      path: "/signin",
      name: "signin",
      beforeEnter(to, from, next) {
        if (!store.state.idToken) {
          next();
        } else {
          next("/");
        }
      },
      component: () => import("@/components/auth/SignIn")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("/signin");
        }
      },
      component: () => import("@/components/dashboard/Dashboard")
    }
  ]
});
