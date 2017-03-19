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
        Hi {{ userInfo.name }}
        <br>Time now is: {{ hours + 8 | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }} Hrs

        <AdminHeader v-if="admin"></AdminHeader>
        <UserHeader v-if="!admin" :userBalance="balance"></UserHeader>
        <hr>
        <router-view :userBalance="balance"></router-view>

      </div>
      <br>
    </div>
  </div>
</template>

<script>

  import AdminHeader from './AdminHeader.vue';
  import UserHeader from './UserHeader.vue';
  import Charge from './Charge.vue';
  import { eventBus } from './app';
  import axios from 'axios';

  export default {
    components: {
      AdminHeader: AdminHeader,
      UserHeader: UserHeader,
      Charge: Charge
    },
    data: () => ({
      admin: '',
      userInfo: '',
      balance: 0,
      now: Math.trunc((new Date()).getTime() / 1000),
      month: (new Date()).getMonth(),
      message: 'hihihi'
    }),
    beforeMount() {
      axios.get('/api/admin')
      .then((response) => {
        this.admin = response.data.admin;
      });
      axios.get('/api/user')
      .then((response) => {
        console.log("HELLLLLOOOOOOO from mother app", response.data.user);
        this.userInfo = response.data.user;
        this.balance = response.data.user.balance;
        eventBus.$emit('balanceWasRetrieved', this.balance);
      });
    },
    mounted() {
      let vm = this;
      let updateTime = setInterval(function() {
        vm.now = Math.trunc((new Date()).getTime() / 1000);
      }, 1000)
    },
    computed: {
      seconds() {
        return (this.now % 60);
      },
      minutes() {
        return parseInt((this.now / 60) % 60);
      },
      hours() {
        return parseInt((this.now / 60 / 60) % 24);
      },
    },
    created() {
      let vm = this;
      eventBus.$on('balanceWasEdited', function(money) {
        vm.balance += money;
      })
    },
    filters: {
      two_digits: function(value) {
        if (value.toString().length <= 1) {
          return "0"+value.toString();
        }
          return value.toString();
      }
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
