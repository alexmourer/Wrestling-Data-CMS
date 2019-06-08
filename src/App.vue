<template>
  <div id="app">
    <div v-for="(stat, index) in stats" :key="index">
      <StatLine class="statLine" :data="stat"/>
    </div>
    <AddWrestler/>
  </div>
</template>

<script>
import AddWrestler from "./components/AddWrestler";
import StatLine from "./components/StatLine";
import firebase from "firebase";
import { db } from "./main";

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
    deleteWrestler(id) {
      db.collection("comics")
        .doc(id)
        .delete();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+HK:400,500,700,900&display=swap");

body {
  font-family: "Noto Sans HK", sans-serif;
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
  color: #42b983;
}
.editor {
  border: 1px solid #ccc;
}
.statLine {
  padding: 20px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
