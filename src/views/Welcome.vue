<template>
  <div id="welcome">
    <h1>Time to learn something new!</h1>
    <p>
      You found the best place to learn - and now you're just one sign in (or
      sign up) away from it!
    </p>
    <div class="cta">
      <router-link v-if="!isAuthenticated" to="/signup">Sign Up</router-link>
      <router-link v-if="!isAuthenticated" to="/signin">Sign In</router-link>
      <router-link v-if="isAuthenticated" to="/dashboard"
        >Go to your Dashboard</router-link
      >
    </div>
  </div>
</template>

<script>
import * as types from "@/store/types.js";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: types.GET_IS_AUTHENTICATED
    })
  }
};
</script>

<style scoped>
#welcome {
  width: 80%;
  margin: auto;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
