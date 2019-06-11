import Vue from "vue";
import Router from "vue-router";
import RosterData from "./views/RosterData.vue";
import ShowData from "./views/ShowData.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "rosterdata",
      component: RosterData
    },
    {
      path: "/showdata",
      name: "showdata",
      component: ShowData
    }
  ]
});
