<template>
  <div>

  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    beforeMount() {
      axios.get('/api/auctions')
      .then((response) => {
        console.log(response.data);
      });
    }
  }
</script>

<style lang="css">
</style>
