<template>
  <!-- <ul class="nav nav-pills">
    dvsdg
    <router-link to="/" tag="li" active-class="active"><a>Home</a><router-link>
    <li role="presentation"><router-link to="/">User<router-link></li>
  </ul> -->
  <ul class="nav nav-pills">
  <router-link to="/home" tag="li" active-class="active"><a>Home</a></router-link>
  <router-link to="/auctions" tag="li" active-class="active"><a>Auctions</a></router-link>
  <router-link to="/results" tag="li" active-class="active"><a>Results</a></router-link>
  <!-- <router-link to="/auth/logout" tag="li"><a>Logout</a></router-link> -->
  </ul>
</template>

<script>
  import { eventBus } from './app';
  import axios from 'axios';

  export default {
    props: ['userBalance'],
    data() {
      return {
        userInfo: ''
      }
    },
    beforeMount() {
      axios.get('/api/user')
      .then((response) => {
        console.log("HELLLLLOOOOOOO");
        this.userInfo = response.data.user;

      });
    },
    created() {
      eventBus.$on('balanceWasEdited', function(money) {
        this.userBalance += money;
      })
    },
    methods: {
      iniLogout() {
        axios.get('/auth/logout')
        .then(function(response) {})
        .catch(function(error) {})
      }
    }
  }

</script>
