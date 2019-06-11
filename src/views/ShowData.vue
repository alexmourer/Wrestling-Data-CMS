<template>
  <div id="app">
    <div class="pageTop">
      <h3 class="sectiontitle">Show Data</h3>
      <input v-on:keyup="searchInput" v-model="searchText" placeholder="Search Shows">
    </div>
    <div class="statLine" v-for="(stat, index) in stats" :key="index">
      <ShowLine :data="stat"/>
    </div>
    <AddShow/>
  </div>
</template>

<script>
import AddShow from "../components/AddShow";
import ShowLine from "../components/ShowLine";
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "App",
  components: {
    AddShow,
    ShowLine
  },
  data() {
    return {
      stats: [],
      roster: [],
      name: "",
      nicname: "",
      searchText: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("shows"),
      roster: db.collection("shows")
    };
  },
  methods: {
    addWrestler(name, nicname) {
      db.collection("shows")
        .doc(name)
        .set({
          name: name,
          nicname: nicname
        });
      // Clear values
      this.name = "";
      this.nicname = "";
    },
    updateWrestler(name, nicname) {
      db.collection("shows")
        .doc(name)
        .update({
          nicname: nicname
        });
      // Clear values
      this.name = "";
      this.nicname = "";
    },
    searchInput() {
      var newStats = [];

      this.stats = this.roster;
      if (this.searchText.length > 0) {
        for (var stat of this.stats) {
          if (
            stat.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
          ) {
            newStats.push(stat);
          }
        }
        this.stats = newStats;
      } else {
        this.stats = this.roster;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
