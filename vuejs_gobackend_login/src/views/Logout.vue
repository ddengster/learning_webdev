<template>
  <div class="logout">
    <h1>This is the logout page</h1>
    <p>{{ status.loggedIn }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import router from '../router'
import VueCookie from 'vue-cookie'

export default {
  computed: {
    ...mapState('store', ['status']),
     status () {
      return this.$store.state.status;
    }
  },
  mounted () {
    // reset login status
    // this.logout();
    clearTimeout();
    setTimeout( () => { 
      console.log("waiting fin!");
      console.log(this.$store.state.status.loggedIn);
      this.$store.state.status.loggedIn = false;
      this.$store.state.status.loggingIn = false;
      //this.$session.destroy();
      //location.reload();
      //this.$forceUpdate();
      router.push("/login");
      //router.go("/login");
      console.log(this.$cookie.get('AccessToken'));
      this.$cookie.delete('AccessToken');
      
      
    }, 1000);
    
  },
}
</script>