import App from './App.vue/';
import Home from './Home.vue/';
import AnotherHome from './AnotherHome.vue/';
import AllAuctions from './AllAuctions.vue/';
import Charge from './Charge.vue/';
import Header from './Header.vue/';

export const routes = [
  { path: '', component: App },
  { path: '/home', component: Home },
  { path: '/anotherhome', component: AnotherHome },
  { path: '/auctions', component: AllAuctions },
  { path: '/charge', component: Charge }
];
