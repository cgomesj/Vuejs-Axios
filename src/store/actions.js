import * as types from "@/store/types.js";
import axios from "@/axios-auth.js";
import globalAxios from "axios";
import router from "@/router.js";

export default {
  [types.CLEAR_AUTH_USER]: ({ commit }) => {
    commit(types.MUTATION_CLEAR_AUTH_USER);
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");
    localStorage.removeItem("expirationDate");
    router.replace("/");
  },

  [types.LOGOUT_TIMER]: ({ dispatch }, expirationTime) => {
    console.log("Timer started.", "Time left:", expirationTime);
    setTimeout(() => {
      dispatch(types.CLEAR_AUTH_USER);
    }, expirationTime * 1000);
  },

  [types.AUTO_LOGIN]: ({ commit }) => {
    const idToken = localStorage.getItem("idToken");
    const localId = localStorage.getItem("localId");

    if (!idToken || !localId) {
      return;
    }

    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();

    if (now >= expirationDate) {
      return;
    }

    const userData = {
      idToken,
      localId
    };

    commit(types.MUTATION_AUTH_USER, userData);
    router.replace("/dashboard");
  },

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

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("idToken", userData.idToken);
        localStorage.setItem("localId", userData.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(types.STORE_USER, authData);

        dispatch(types.LOGOUT_TIMER, response.data.expiresIn);
      })
      .catch(error => console.log(error));
  },

  [types.SIGN_IN]: ({ commit, dispatch }, authData) => {
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

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("idToken", userData.idToken);
        localStorage.setItem("localId", userData.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(types.LOGOUT_TIMER, response.data.expiresIn);

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
