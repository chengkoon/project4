<template>
  <div>

    <div v-if="!ongoingAuction">
        There's no ongoing auction at the moment! Check out the results tab!
    </div>
    <div v-if="ongoingAuction">
      Auction #{{ongoingAuction.id}}<br>
      Item: {{ongoingAuction.item}}<br>
      Description: {{ongoingAuction.description}}<br>
      Bid Range: from ${{ongoingAuction.minBid}} (inclusive) to ${{ongoingAuction.maxBid}} (exclusive)<br>
      {{ ongoingAuction.endDate }} and {{ ongoingAuction.endHour }} and {{ ongoingAuction.endMinute }} <br>
      {{ Date.parse(ongoingAuction.endDate)/1000 + (ongoingAuction.endHour * 3600) + (ongoingAuction.endMinute * 60) }}

      <form>
        <div class="form-group">
          <label for="secretBid">Place your secret bid here (between ${{ongoingAuction.minBid}} and ${{ongoingAuction.maxBid-0.01}} inclusive):</label>
          <!-- <select class="form-control" id="secretBid" v-model="selectedBid">
            <option v-for="number in bidRange(ongoingAuction.minBid,ongoingAuction.maxBid)">{{number}}</option>
          </select> -->
          <input type="text" name="" v-model="selectedBid" placeholder="e.g. 1.15">
          <div v-if="!userInfo.hasPlacedBid && !isAuctionOver">
          <button type="submit" class="btn btn-primary" @click="createBid">Place Bid!</button>
          </div>
          <div v-if="userInfo.hasPlacedBid && !isAuctionOver">
          <button type="submit" class="btn btn-primary" disabled>Bid Placed!</button>
          </div>
          <!-- <div v-if="isAuctionOver">
          <button type="submit" class="btn btn-warning">See Results!</button>
          </div> -->

        </div>
      </form>
    </div>


    <!-- <br>
    userInfo: {{ userInfo }}
    <br>
    auctionInfo: {{ ongoingAuction }} -->


  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        ongoingAuction: false,
        selectedBid: 0,
        timeNowValue: 0,
        now: Math.trunc((new Date()).getTime() / 1000),
        userInfo: {}
      }
    },
    mounted() {
      let vm = this;
      let updateTime = setInterval(function() {
        vm.now = Math.trunc((new Date()).getTime() / 1000);
      }, 1000)
    },
    computed: {
      // timesUp() {
      //   if (this.countdown <= 0) {
      //     alert('timesUp computed method invoked!')
      //   }
      // }
      isAuctionOver() {
        if ((this.now >= (Date.parse(this.ongoingAuction.endDate)/1000 + (this.ongoingAuction.endHour * 3600) + (this.ongoingAuction.endMinute * 60))) && (!this.ongoingAuction.hasEnded)) {

          //initiate series of toggling
          //initiate findWinner
          axios.put('/api/auctions') // updates auction's hasEnded to true
          .then((result) => {
            // vm.ongoingAuction = auction.data.auction;
            console.log("result of isAuctionOver is...", result);
            this.getAuctionInfo(); // get request for new hasEnded status
            this.clearUserHasPlacedBid(); // put request to clear user hasPlacedBid
          })
          return true;
        }
        // else if (this.ongoingAuction.hasEnded == true) {
        //   this.clearUserHasPlacedBid();
        // }
        else {
          return false;
        }
      }
    },
    beforeMount() {
      let vm = this;
      axios.all([
        axios.get('/api/user'),
        axios.get('/api/auctions')
      ])
      .then(axios.spread(function(user, auction) {
        console.log("beforeMount: get req for user and auction done...");
        vm.userInfo = user.data.user;
        vm.ongoingAuction = auction.data.auction;
        if (!vm.ongoingAuction) {
          vm.clearUserHasPlacedBid();
        }
      }))

    },
    methods: {
      // bidRange: function(min, max) {
      //   let array = [];
      //   for ( let i = min; i < max; i += 0.01 ) {
      //     let j = parseFloat(i.toFixed(2));
      //     array.push(j);
      //   };
      //   return array
      // },
      createBid() {
        event.preventDefault();
        // console.log("auctionId is...", auctionId);
        let vm = this;
        let verifyBidData = {
          auctionId: vm.ongoingAuction.id,
          charity: 1,
          amount: this.selectedBid
        };
        axios.post('/api/user/bid', verifyBidData)
        .then(function(response) {
          //get back the result
          console.log("response gotten back from after bidding is...",response.data);
          vm.getUserInfo();
        })
        .catch(function(error) {
          console.log(error);
        })
        // axios.get('/api/user')
        // .then(function(user) {
        //   vm.userInfo.hasPlacedBid = user.data.user.hasPlacedBid;
        // })
      },
      getUserInfo() {
        axios.get('/api/user')
        .then((user) => {
          this.userInfo = user.data.user;
        })
        .catch((error) => {
          return error;
        })
      },
      getAuctionInfo() {
        axios.get('/api/auctions')
        .then((auction) => {
          console.log("CHECK getAuctionInfo, response.data is...", auction.data);
          this.ongoingAuction = auction.data.auction;
        })
      },
      clearUserHasPlacedBid() {
        axios.put('/api/user/clearBid')
        .then((user) => {
          console.log("CHECK clearUserHasPlacedBid, response.data is...", user.data);
          this.getUserInfo();
        })
      },
      // timesUpEvent() {
      //   // alert('timesUpEvent invoked')
      //   axios.get('/api/bid/findWinner')
      //   .then((response) => {
      //     console.log("winners received are...", response.data.bids);
      //     let arrayOfBids = response.data.bids.map(function(iteration) {
      //       return iteration.amount;
      //     })
      //     console.log("arrayOfBids is...", arrayOfBids);
      //     // let uniqueBids = arrayOfBids.filter(function(value, index, self) {
      //     //     return self.indexOf(value) === index;
      //     // })
      //     // console.log("uniqueBids is...", uniqueBids);
      //     let arrayOfBidsInt = arrayOfBids.map(function(elem) {
      //       return parseFloat(elem)
      //     })
      //     console.log(arrayOfBidsInt);
      //     let sortedBids = arrayOfBidsInt.sort(function(a, b) {
      //       return b-a;
      //     })
      //     console.log(sortedBids);
      //     let highestUniqueBid;
      //     for (let i=0; i<sortedBids.length; i++) {
      //       if (i===0 && sortedBids[i] !== sortedBids[i+1]) {
      //         highestUniqueBid = sortedBids[i];
      //         return;
      //       }
      //       else if ((sortedBids[i] !== sortedBids[i-1]) && (sortedBids[i] !== sortedBids[i+1])) {
      //         highestUniqueBid = sortedBids[i];
      //       }
      //       else {
      //         continue;
      //       }
      //     }
      //     console.log("winner is...", highestUniqueBid);
      //     let winnerId;
      //     for (let iteration in response.data.bids) {
      //       if (iteration.amount === highestUniqueBid.toString()) {
      //         winnerId = iteration.userId;
      //       }
      //     }
      //     axios.get('/api/winner', { winnerId: winnerId })
      //     .then(function(response) {
      //       console.log("WINNER IS.....",response.data);
      //     })
      //   })
      // }
    },
    // mounted() {

      // let vm = this;
      // let countdownInterval = setInterval(function() {
      //   console.log("setInterval loaded......");
      //   // vm.countdown--;
      //   if (vm.countdown <= 0) {
      //
      //     clearInterval(countdownInterval);
      //     vm.timesUpEvent();
      //   }
      //   else if (vm.countdown > 0) {
      //     let newCountdown = vm.countdown - 1;
      //     axios.put('/api/user/countdown', { newCountdown: newCountdown })
      //     .then(function(response) {
      //       console.log("response is back....", response);
      //       vm.countdown = JSON.parse(response.config.data).newCountdown
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     })
      //   }
      //   }, 1000)

    // }
  }
</script>

<style>
</style>
