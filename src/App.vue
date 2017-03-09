<template>
  <div class="container">
    <!-- <div class="adminDashboard" v-if="admin">
      admin dashboard
      <br>

    </div>
    <div class="userDashboard" v-if="!admin">
      user dashboard
    </div> -->
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Tikam tikam</h1>
        <hr>
        <appHeader v-if="admin"></appHeader>
        <UserHeader v-if="!admin"></UserHeader>
        <router-view></router-view>
      </div>
      {{ admin }}
      <br>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import UserHeader from './UserHeader.vue'
  import axios from 'axios';

  export default {
    components: {
      appHeader: Header,
      UserHeader: UserHeader
    },
    data: () => ({
      admin: ''
    }),
    beforeMount() {
      axios.get('/api/admin')
      .then((response) => {
        console.log(response.data);
        this.admin = response.data.admin;
      });
    }
  }
</script>

<style>
  .slide-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
    animation: slide-out 1s ease-out forwards;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }

  @keyframes slide-out {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-30px);
    }
  }

  @keyframes slide-in {
    0% {
        transform: translateY(-30px);
    }
    100% {
        transform: translateY(0);
    }
  }
</style>
