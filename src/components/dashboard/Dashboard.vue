<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <div v-if="user">
      <p>User mail: {{ email }}</p>
    </div>
    <div v-else>
      <p>To see your informations, please login or signup!</p>
      <div class="cta">
        <router-link to="/">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/types.js";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: types.GET_USER
    }),

    email() {
      return this.user ? this.user.email : false;
    }
  },

  created() {
    this.$store.dispatch(types.FETCH_USER);
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>
