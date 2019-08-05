import * as types from "@/store/types.js";

export default {
  [types.GET_USER]: state => {
    return state.user;
  },

  [types.GET_IS_AUTHENTICATED]: state => {
    return state.idToken !== null;
  }
};
