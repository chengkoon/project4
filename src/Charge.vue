<template>
  <div>
    <button type="button" @click="topUpBalance(5)">Five</button>
    <button type="button" @click="topUpBalance(10)">Ten</button>
    <button type="button" @click="topUpBalance(50)">Fifty</button>
  </div>
</template>

<script>
  import { eventBus } from './app';
  import axios from 'axios';

  export default {
    props: ['userBalance'],
    data() {
      return {
        balance: 0
      }
    },
    methods: {
      topUpBalance: function(money) {
        let money2 = money + this.userBalance;
        axios.put('/api/user/balance', { topup: money2 })
        .then((response) => {
          console.log("topUpBalance req sent!");
          // this.$emit('balanceWasEdited', money);
          eventBus.$emit('balanceWasEdited', money);
        })
        .catch(function(error) {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang="css">
</style>
