<template>
  <div id="app">
    <component :is="'app-header'"></component>
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/header/header.vue";

export default {
  components: {
    "app-header": AppHeader
  }
};
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
