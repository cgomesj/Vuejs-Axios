import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters.js";
import mutations from "@/store/mutations.js";
import actions from "@/store/actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    localId: null,
    user: null
  },

  getters,

  mutations,

  actions
});
