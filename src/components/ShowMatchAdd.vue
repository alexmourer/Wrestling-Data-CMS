

<template>
  <div>
    <button title="Add Match" class="addMatch" @click="addMatch = true;setFocus()">+ Add Match</button>
    <transition name="fade">
      <div class="addWresler" v-if="addMatch">
        <form @submit.prevent="addWrestlerFunc(
        matchTitle 
      ); addMatch = false">
          <div @click="addMatch = false" class="close">X</div>
          <input ref="name" v-model="matchTitle" placeholder="Match Title">
          <button class="update" type="submit">Add Match</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "ShowMatchAdd",
  props: {
    showdata: {
      type: String
    }
  },
  data() {
    return {
      stats: [],
      matchTitle: "",
      editField: "",
      addMatch: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("shows")
    };
  },
  methods: {
    addWrestlerFunc(matchTitle) {
      db.collection("shows")
        .doc(this.showdata)
        .collection("matches")
        .doc(matchTitle)
        .set({
          matchtitle: matchTitle
        });
      // Clear values
      this.matchTitle = "";
    },
    setFocus() {
      this.$nextTick(() => {
        this.$refs.name.focus();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
input,
select {
  border: 1px solid #ccc;
  padding: 3px 0;
  margin: auto;
  color: #333;
  width: 100%;
  text-align: center;
  float: none;
}
.addButton {
  background: #000;
  border-radius: 45px;
  -webkit-box-shadow: 0 0 6px rgb(141, 139, 139);
  box-shadow: 0 0 6px rgb(141, 139, 139);
  padding: 18px 17px;
  font-size: 13px;
  color: #fff;
  border: none;
  position: fixed;
  bottom: 8px;
  right: 8px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.addButton:hover {
  background: #fff;
  color: #000;
}
.addButton:selected {
  border: none;
  outline: none;
}
form {
  position: relative;
}
.close {
  position: absolute;
  right: -7px;
  top: -7px;
  border-radius: 30px;
  background: #ccc;
  padding: 7px 11px;
  line-height: 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.7em;
  color: rgb(77, 75, 75);
  box-shadow: 0 0 3px rgb(105, 104, 104);
}
.addWresler {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background: rgba(15, 13, 22, 0.767);
}
form {
  padding: 10px;
  width: 80%;
  margin: 10% auto;
  background: #f2f2f2;
}
.addMatch {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  text-transform: uppercase;
  padding: 6px 9px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-size: 0.8em;
}
.addMatch:hover {
  background: #fff;
  color: #000;
}
.update {
  display: block;
  width: 100%;
  background: #000;
  color: #fff;
  text-transform: uppercase;
  padding: 5px;
  margin-top: 10px;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.update:hover {
  background: #fff;
  color: #000;
}
</style>
