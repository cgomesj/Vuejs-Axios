import Vue from "vue";
import Router from "vue-router";
import WelcomePage from "./views/Welcome.vue";

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
      component: () => import("@/components/auth/SignUp")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/components/auth/SignIn")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/components/dashboard/Dashboard")
    }
  ]
});
