<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/restricted">Restricted page</router-link>
    <p>Logged in: {{ status.loggedIn }}</p>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import router from '../router'

export default {
  computed: {
    ...mapState('store', ['status']),
     status () {
      return this.$store.state.status;
    }
  }
}
</script>