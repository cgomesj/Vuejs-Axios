import axios from "axios";

const instance = axios.create({
  baseURL: "https://vuejs-axios-6adac.firebaseio.com"
});

instance.defaults.headers.common["SOMETHING"] = "something";

export default instance;
