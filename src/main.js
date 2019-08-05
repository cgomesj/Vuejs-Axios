import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://vuejs-axios-6adac.firebaseio.com";

const requestInterceptor = axios.interceptors.request.use(config => {
  console.log("Request Interceptor:", config);
  return config;
});

const responseInterceptor = axios.interceptors.response.use(response => {
  console.log("Response Interceptor:", response);
  return response;
});

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
