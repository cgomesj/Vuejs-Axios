import * as types from "@/store/types.js";

export default {
  [types.MUTATION_AUTH_USER]: (state, userData) => {
    console.log("User credentials stored on vuex:", userData);
    (state.idToken = userData.idToken), (state.localId = userData.localId);
  },

  [types.MUTATION_STORE_USER]: (state, user) => {
    console.log("User details stored on vuex:", user);
    state.user = user;
  }
};
