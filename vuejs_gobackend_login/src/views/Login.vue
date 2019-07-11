<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
        <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
      <div class="form-group">
        <router-link to="/register" class="btn btn-link">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import router from '../router'
    
export default {
  data () {
    return {
      username: '',
      password: '',
      submitted: false
    }
  },
  computed: {
     ...mapState('store', ['status']),
    status () {
      return this.$store.state.status;
    },
    ...mapState(['status', 'secureUrl']) // by default maps to our Vuex store (declared in store.js. Treat as our persistant state across the application)

  },
  created () {
    // reset login status
    // this.logout();
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true
      const { username, password } = this
      if (username && password) {
        //console.log('user/pwd: ', username, password)
        this.$store.state.status.loggingIn = true;
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password })
        };
        //console.log('sending POST to ', this.$store.state.secureUrl + "/auth");
        
        var url = this.$store.state.secureUrl + "/login";
        console.log('sending POST to ', this.$store.state.secureUrl + "/login");
        //https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
        
        return fetch(url, requestOptions)
          .then(response => {
              if (!response.ok) {
                this.$store.state.status.loggingIn = false;
                location.reload(true);
              }
              else
                return response.text();
            })
          .then(user => { 
              //success, jwt token is in the cookie thanks to credentials header
              console.log("login success yay!");
              
              this.$store.state.status.loggedIn = true;
              this.$store.state.status.loggingIn = false;
              
              //this.$cookie.set('token',user.token);
              router.push("/about");
            },
            error => {
              this.$store.state.status.loggingIn = false;
              console.log("error occurred during login")
            }
          );
      }
    }
    
    
  }
}
</script>
