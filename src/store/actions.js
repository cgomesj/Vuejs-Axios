import * as types from "@/store/types.js";
import axios from "@/axios-auth.js";
import globalAxios from "axios";
import router from "@/router.js";

export default {
  [types.SIGN_UP]: ({ commit, dispatch }, authData) => {
    axios
      .post("/accounts:signUp?key=AIzaSyAxUHkg7axlyO93d3iEw_hMdtTVvbkMJGk", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(
          "user successfully registered and authenticated on firebase authentication system",
          "SIGN_UP Response:",
          response
        );

        const userData = {
          idToken: response.data.idToken,
          localId: response.data.localId
        };

        commit(types.MUTATION_AUTH_USER, userData);

        dispatch(types.STORE_USER, authData);
      })
      .catch(error => console.log(error));
  },

  [types.SIGN_IN]: ({ commit }, authData) => {
    axios
      .post(
        "/accounts:signInWithPassword?key=AIzaSyAxUHkg7axlyO93d3iEw_hMdtTVvbkMJGk",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(response => {
        console.log(
          "user successfully authenticated on firebase authentication system",
          "SIGN_IN Response:",
          response
        );

        const userData = {
          idToken: response.data.idToken,
          localId: response.data.localId
        };

        commit(types.MUTATION_AUTH_USER, userData);

        router.push("/dashboard");
      })
      .catch(error => console.log(error));
  },

  [types.STORE_USER]: ({ state }, userData) => {
    if (!state.idToken) {
      return;
    }

    globalAxios
      .post("/users.json" + "?auth=" + state.idToken, userData)
      .then(() => {
        console.log(
          "user successfully registered on firebase realtime database",
          "User data:",
          userData
        );
      })
      .catch(error => {
        console.log(error);
      });
  },

  [types.FETCH_USER]: ({ commit, state }) => {
    if (!state.idToken) {
      return;
    }

    globalAxios
      .get("/users.json" + "?auth=" + state.idToken)
      .then(response => {
        console.log("Data successfully fetched from /users.json", response);
        const data = response.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }

        console.log("Users fetched from /users.json", users);

        commit(types.MUTATION_STORE_USER, users[0]);
      })
      .catch(error => console.log(error));
  }
};
