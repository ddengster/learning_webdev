
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="status.loggedIn == false" to="/login">Login</router-link> 
      <router-link v-else to="/logout">Logout</router-link> | <!-- {{ status.loggedIn }}-->
      <router-link to="/register">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  computed: {
    ...mapState('store', ['status']),
    status () {
      return this.$store.state.status;
    }
  },
  created () {
    // reset login status
    // this.logout();
    console.log("created header");
    //console.log(this.$store.state.status.loggedIn);
  },
  mounted() {
    console.log("mounted header");
  }
}

</script>