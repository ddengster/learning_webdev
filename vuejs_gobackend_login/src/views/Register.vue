<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" v-model="user.username" v-validate="'required'" name="username" class="form-control" :class="{ 'is-invalid': submitted && !user.username }" />
      <div v-if="submitted" class="invalid-feedback">{{ errors.first('username') }}</div>
    </div>
    <div class="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" v-model="user.password" v-validate="'required|min:6'" name="password" class="form-control" :class="{ 'is-invalid': submitted && !user.password }" />
      <div v-if="submitted" class="invalid-feedback">{{ errors.first('password') }}</div>
    </div>
    <!-- todo: confirm password -->
    <div class="form-group">
      <button class="btn btn-primary" :disabled="status.registering">Register</button>
      <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      <!--<router-link to="/login" class="btn btn-link">Cancel</router-link>-->
    </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      submitted: false
    }
  },
  computed: {
    ...mapState(['status']) // by default maps to our Vuex store (declared in store.js. Treat as our persistant state across the application)
  },
  created () {
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true
      
      if (this.user.username && this.user.password) {
        console.log('user/pwd: ', this.user.username, this.user.password)
        //commit('registerRequest', user);
    /*
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );*/

        // todo: axios html post to go backend
      }
    }
  }
}
</script>
