<template>
  <div id="app">
    <div class="header">
      <h1 class="sitetitle">AEW Data Manager</h1>
      <div class="nav">
        <router-link to="/">Roster Data</router-link>
        <router-link to="/showdata">Show Data</router-link>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import AddWrestler from "./components/AddWrestler";
import StatLine from "./components/StatLine";
import firebase from "firebase";
import { db } from "./main";
import { page } from "vue-analytics";

export default {
  name: "App",
  components: {
    AddWrestler,
    StatLine
  },
  data() {
    return {
      stats: [],
      name: "",
      nicname: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("stats")
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
    track() {
      page("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+HK:400,500,700,900&display=swap");

body {
  font-family: "Noto Sans HK", sans-serif;
  padding: 0 3%;
  letter-spacing: 0.2px;
  margin-bottom: 75px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.nav {
  margin: 15px 0 25px;
}
.nav a {
  padding: 4px;
  font-size: 0.89em;
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px;
  transition: all 0.2s ease;
}
.nav a:hover {
  border-bottom: 2px solid #000;
}
a.router-link-exact-active {
  border-bottom: 2px solid #000;
}
.sitetitle {
  margin: 15px 0 25px;
  font-size: 1.2em;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000;
}
.sectiontitle {
  font-size: 0.7em;
  color: #bec0c3;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
  margin-top: 7px;
}
.editor {
  border: 1px solid #ccc;
}
.statLine {
  padding: 5px 10px;
}
.statLine:nth-child(odd) {
  background: #f9f9f9;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
