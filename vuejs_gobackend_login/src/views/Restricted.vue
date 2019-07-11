<template>
  <div class="restricted">
    <h1>This is the restricted page</h1>
    <div id="example-1">
    <button v-on:click="grabBackendData">Grab backend data..</button>
    <p>{{ this.backendData }}</p>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import router from '../router'

export default {
  data () {
    return {
      backendData: ''
    }
  },
  computed: {
    ...mapState('store', ['status']),
     status () {
      return this.$store.state.status;
    },
    ...mapState(['status', 'secureUrl'])
  },
  mounted () {
  },
  methods: {
  //so we can use 'this' in our functions: https://michaelnthiessen.com/this-is-undefined
    grabBackendData(event) {
      if (this.status.loggedIn == false)
      {
        this.backendData = "NOT LOGGED IN";
        return;
      }
    
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          //'headers': { 'Authorization': this.$cookie.get('token') } //alternative with vue-cookie
          credentials: 'include'
        };
      var url = this.$store.state.secureUrl + "/restricted";
      console.log('sending POST to ', this.$store.state.secureUrl + "/restricted");
      
      return fetch(url, requestOptions)
            .then(response => {
              if (!response.ok) {
                console.log("failed to access restricted data: status ", response.status);
                return;
              }
              console.log("sucess getting restricted data!");
              return response.text();
              
            })
            .then(text => { 
              console.log(text);
              this.backendData = text;
            });
    }
  }
}
</script>
