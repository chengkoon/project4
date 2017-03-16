import Home from './Home.vue/';
import CreateAuction from './CreateAuction.vue/';
import AllAuctions from './AllAuctions.vue/';
import Results from './Results.vue/';
import Charge from './Charge.vue/';
// import Header from './Header.vue/';

export const routes = [
  { path: '', component: Home },
  { path: '/home', component: Home },
  { path: '/createAuction', component: CreateAuction },
  { path: '/auctions', component: AllAuctions },
  { path: '/results', component: Results },
  { path: '/charge', component: Charge }
];
