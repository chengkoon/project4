<template>
  <!-- <ul class="nav nav-pills">
    dvsdg
    <router-link to="/" tag="li" active-class="active"><a>Home</a><router-link>
    <li role="presentation"><router-link to="/">User<router-link></li>
  </ul> -->
  <ul class="nav nav-pills">
  <router-link to="/home" tag="li"><a>Home</a></router-link>
  <router-link to="/auctions" tag="li"><a>View Auctions</a></router-link>
  <router-link to="/charge" tag="li"><a>Balance: {{ userInfo.balance }}</a></router-link>
  </ul>
</template>

<script>

  import axios from 'axios';

  export default {
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
    }
  }

</script>
