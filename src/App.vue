<template>
  <div id="app">
    <component :is="'app-header'"></component>
    <router-view />
  </div>
</template>

<script>
import * as types from "@/store/types.js";
import AppHeader from "@/components/header/Header.vue";

export default {
  components: {
    "app-header": AppHeader
  },

  created() {
    this.$store.dispatch(types.AUTO_LOGIN);
  }
};
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.cta {
  width: 300px;
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #521751;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #521751;
}

.cta a:hover,
.cta a:active {
  background-color: #521751;
  color: white;
}
</style>
