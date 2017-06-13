<template>
    <div>
      <form>
        <div class="form-group">
          <label for="item">Item for Auction</label>
          <input type="text" class="form-control" id="item" placeholder="Enter item name..." v-model="auctionData.item">
        </div>
        <div class="form-group">
          <label for="description">Item Description</label>
          <input type="text" class="form-control" id="description" placeholder="Describe the item..." v-model="auctionData.description">
        </div>
        <div class="modal-body row">
          <div class="form-group col-md-4">
            <label for="retailPrice">Item's Retail Price</label>
            <input type="text" class="form-control" id="retailPrice" placeholder="120" v-model="auctionData.retailPrice">
          </div>
          <div class="form-group col-md-4">
            <label for="minBid">Minimum bid for users</label>
            <input type="text" class="form-control" id="minBid" placeholder="4.00" v-model="auctionData.minBid">
          </div>
          <div class="form-group col-md-4">
            <label for="maxBid">Maximum bid for users</label>
            <input type="text" class="form-control" id="maxBid" placeholder="4.99" v-model="auctionData.maxBid">
          </div>
        </div>
        <div class="form-group col-md-4">
          <label for="charity">Charity 1</label>
          <select class="form-control" id="charity"  v-model="auctionData.charity">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <!-- <div class="form-group col-md-4">
          <label for="charity02">Charity 2</label>
          <select class="form-control" id="charity02" v-model="auctionData.charity02">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="charity03">Charity 3</label>
          <select class="form-control" id="charity03" v-model="auctionData.charity03">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div> -->
        <!-- <div class="form-group row col-md-6">
          <label for="countdown">Countdown Seconds</label>
            <input class="form-control" type="text" value="600" id="countdown" v-model="auctionData.countdown">
        </div> -->
        <div class="form-group row col-md-6">
          <label for="endDate">End Date</label>
            <input class="form-control" type="date" id="endDate" v-model="auctionData.endDate">
        </div>
        <div class="form-group row col-md-3">
          <label for="endHour">End Hour</label>
            <input class="form-control" type="text" id="endHour" v-model="auctionData.endHour">
        </div>
        <div class="form-group row col-md-3">
          <label for="endMinute">End Minute</label>
            <input class="form-control" type="text" id="endMinute" v-model="auctionData.endMinute">
        </div>
        <!-- <div class="form-group row col-md-6">
          <label for="endTime">Time</label>
            <input class="form-control" type="time" value="13:45:00" id="endTime" v-model="auctionData.endTime">
        </div> -->
        <!-- <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
          <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
        </div> -->
        <button type="submit" class="btn btn-primary" @click="createAuction">Submit</button>
      </form>
      {{ auctionData }}
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        auctionData: {
          item: '',
          description: '',
          retailPrice: '',
          minBid: '',
          maxBid: '',
          charity: '',
          countdown: '',
          hasEnded: false,
          endDate: '',
          // endTime: ''
          endHour: '',
          endMinute: ''
        }
      }
    },
    methods: {
      createAuction(event){
        event.preventDefault();
        let vm = this;
        let verifyAuctionData = {
          item       : this.auctionData.item,
          description: this.auctionData.description,
          retailPrice: this.auctionData.retailPrice,
          minBid     : this.auctionData.minBid,
          maxBid     : this.auctionData.maxBid,
          charity    : this.auctionData.charity,
          countdown  : this.auctionData.countdown,
          hasEnded   : this.auctionData.hasEnded,
          endDate    : this.auctionData.endDate,
          // endTime    : this.auctionData.endTime
          endHour    : this.auctionData.endHour,
          endMinute    : this.auctionData.endMinute
        };
        axios.post('api/admin/auction', verifyAuctionData)
        .then(function(response) {
          alert('Auction event created!');
        })
        .catch(function(error) {
          console.log(error);
        })
      }
    }
  }
</script>
