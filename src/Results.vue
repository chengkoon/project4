<template>
  <div>
    <!-- {{ userInfo }}
    {{ allCompletedAuctions }} -->
    <div v-for="auction in allCompletedAuctions">
      Auction #{{auction.id}}<br>
      Item: {{auction.item}}<br>
      Description: {{auction.description}}<br>
      Bid Range: from ${{auction.minBid}} (inclusive) to ${{auction.maxBid}} (exclusive)<br>
      {{ auction.endDate }} and {{ auction.endHour }} and {{ auction.endMinute }} <br>
      {{ Date.parse(auction.endDate)/1000 + (auction.endHour * 3600) + (auction.endMinute * 60) }}

      <form>
        <div class="form-group">
          <!-- <label for="secretBid">Place your secret bid here (between ${{auction.minBid}} and ${{auction.maxBid-0.01}} inclusive):</label> -->
          <!-- <select class="form-control" id="secretBid" v-model="selectedBid">
            <option v-for="number in bidRange(auction.minBid,auction.maxBid)">{{number}}</option>
          </select> -->
          <!-- <input type="text" name="" v-model="selectedBid" placeholder="e.g. 1.15"> -->
          <div>
          <button type="checkResult" class="btn btn-warning" @click="calculateWinner(auction.id)">Check Result!</button>
          </div>
          <!-- <div v-if="userInfo.hasPlacedBid && !isAuctionOver">
          <button type="submit" class="btn btn-primary" disabled>Bid Placed!</button>
          </div> -->
          <!-- <div v-if="isAuctionOver">
          <button type="submit" class="btn btn-warning">See Results!</button>
          </div> -->

        </div>
      </form>
    </div>
    <div class="floatingBox" v-if="showFloatingBox">
      The winner is: {{ winnerName }} <br>
      with a bid of ${{ winningBidAmount }} <br>
      <button type="button" name="button" @click="fadeFloatingBox">X</button>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        userInfo: {},
        allCompletedAuctions: [],
        auctionId: '',
        winnerId: '',
        winnerName: '',
        winningBidAmount: '',
        showFloatingBox: false,
        backdrop: 'faded'
      }
    },
    beforeMount() {
      let vm = this;
      axios.all([
        axios.get('/api/user'),
        axios.get('/api/auctionsCompleted')
      ])
      .then(axios.spread(function(user, auctions) {
        console.log("beforeMount(results)...");
        vm.userInfo = user.data.user;
        vm.allCompletedAuctions = auctions.data.auctions;
      }))
    },
    methods: {
      checkResult(event) {
        event.preventDefault();
        alert('checkResult initiated')
      },
      calculateWinner(auctionId) {
        // alert('timesUpEvent invoked')
        event.preventDefault();
        let vm = this;
        vm.auctionId = auctionId;
        axios.post('/api/bid/findWinner', { auctionId: vm.auctionId })
        .then((response) => {
          console.log("winners received are...", response.data.bids); // array of objects
          let arrayOfBids = response.data.bids.map(function(iteration) { //map out the amount only, still str type
            return iteration.amount;
          })
          console.log("arrayOfBids is...", arrayOfBids);
          // let uniqueBids = arrayOfBids.filter(function(value, index, self) {
          //     return self.indexOf(value) === index;
          // })
          // console.log("uniqueBids is...", uniqueBids);
          let arrayOfBidsInt = arrayOfBids.map(function(elem) {
            return parseFloat(elem)
          })
          console.log(arrayOfBidsInt);
          let sortedBids = arrayOfBidsInt.sort(function(a, b) {
            return b-a;
          })
          console.log(sortedBids);
          let highestUniqueBid;
          for (let i=0; i<sortedBids.length; i++) {
            if (i===0 && sortedBids[i] !== sortedBids[i+1]) {
              highestUniqueBid = sortedBids[i];
              return;
            }
            else if ((sortedBids[i] !== sortedBids[i-1]) && (sortedBids[i] !== sortedBids[i+1])) {
              highestUniqueBid = sortedBids[i];
            }
            else {
              continue;
            }
          }
          console.log("winner is...", highestUniqueBid); //int type
          vm.winningBidAmount = highestUniqueBid;
          // let winnerId;
          for (let index in response.data.bids) {
            if (response.data.bids[index].amount === highestUniqueBid.toString()) {
              console.log("found winner", response.data.bids[index].userId);
              vm.winnerId = response.data.bids[index].userId;
              vm.getWinner();
            }
          }

        })
      },
      getWinner() {
        let vm = this;
        console.log(vm.winnerId);
        axios.post('/api/winner', { winnerId: vm.winnerId })
        .then(function(response) {
          console.log("WINNER IS.....",response.data.user.name);
          vm.winnerName = response.data.user.name;
          vm.showFloatingBox = true;
        })
      },
      fadeFloatingBox() {
        this.showFloatingBox = false;
      }
    }
  }
</script>

<style>

  .floatingBox {
    position:absolute;
    left: 40%;
    top: 20%;
    border: 3px solid black;
    background-color: white;
    text-align: center;
    filter:alpha(opacity=100); /* IE */
    opacity: 1; /* Safari, Opera */
    -moz-opacity:1; /* FireFox */
    width:200px;
    height:200px;
  }
</style>
