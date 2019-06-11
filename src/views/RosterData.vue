<template>
  <div id="app">
    <div class="pageTop">
      <h3 class="sectiontitle">Roster Data</h3>
      <input v-on:keyup="searchInput" v-model="searchText" placeholder="Search Roster">
    </div>
    <div class="statLine" v-for="(stat, index) in stats" :key="index">
      <StatLine :data="stat"/>
    </div>
    <AddWrestler/>
  </div>
</template>

<script>
import AddWrestler from "../components/AddWrestler";
import StatLine from "../components/StatLine";
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "App",
  components: {
    AddWrestler,
    StatLine
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
      stats: db.collection("stats"),
      roster: db.collection("stats")
    };
  },
  methods: {
    addWrestler(name, nicname) {
      db.collection("stats")
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
      db.collection("stats")
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
.pageTop {
  border-bottom: 2px solid #000;
  margin-bottom: 5px;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;
}
input {
  margin: 2px 0px;
  display: block;
  border: 1px solid #000;
  outline: none;
  padding: 2px;
  height: 15px;
  font-size: 0.78em;
}
.statLine {
  clear: both;
}
</style>
