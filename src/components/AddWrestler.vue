

<template>
  <div>
    <button title="Add New Wrestler" class="addButton" @click="addWrestler = true">+</button>
    <div class="addWresler" v-if="addWrestler">
      {{name}}
      <form
        @submit.prevent="addWrestler(
        name, 
        nicname,
        height,
        weight,
        dob,
        hometown,
        sigmov,
        wins,
        loses,
        nocon,
        pinsatt,
        pinsatton,
        submissions,
        submitted,
        totalmatches,
        champion,
        partner,
        active,
        twitter 
      )"
      >
        <div @click="addWrestler = false" class="close">X</div>
        <input v-model="name" placeholder="Wrestler Name">
        <input v-model="nicname" placeholder="Wrestler Nic Name">
        <input v-model="hometown" placeholder="Hometown">
        <input v-model="height" placeholder="Height">
        <input v-model="weight" placeholder="Weight">
        <input v-model="dob" placeholder="DOB">
        <input v-model="sigmov" placeholder="Signature Move">
        <input v-model="wins" placeholder="Wins">
        <input v-model="loses" placeholder="Loses">
        <input v-model="nocon" placeholder="No Contest">
        <input type="number" step="1" v-model="pinsatt" placeholder="Pins Attempted">
        <input v-model="pinsatton" placeholder="Pins Attempted On">
        <input v-model="submissions" placeholder="Submissions">
        <input v-model="submitted" placeholder="Submitted">
        <input v-model="totalmatches" placeholder="Total Matches">
        <select v-model="champion">
          <option value>Not Champion</option>
          <option>AEW World Championship</option>
          <option>AEW Women's Champonship</option>
          <option>AEW Tag Champion</option>
        </select>
        <input v-model="partner" placeholder="Partner">
        <input v-model="twitter" placeholder="Twitter">
        <input type="checkbox" v-model="active" id="active" placeholder="Active">
        <label for="active">Active</label>
        <button class="update" type="submit">Add Wrestler</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "HelloWorld",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      stats: [],
      name: "",
      nicname: "",
      height: "",
      weight: "",
      dob: "",
      hometown: "",
      sigmov: "",
      wins: null,
      loses: null,
      nocon: null,
      pinsatt: null,
      pinsatton: null,
      submissions: null,
      submitted: null,
      totalmatches: null,
      champion: "",
      partner: "",
      active: "",
      twitter: "",
      editField: "",
      addWrestler: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("stats")
    };
  },
  methods: {
    addWrestler(
      name,
      nicname,
      height,
      weight,
      dob,
      hometown,
      sigmov,
      wins,
      loses,
      nocon,
      pinsatt,
      pinsatton,
      submissions,
      submitted,
      totalmatches,
      champion,
      partner,
      active,
      twitter
    ) {
      db.collection("stats")
        .doc(name)
        .set({
          name: name,
          nicname: nicname,
          height: height,
          weight: weight,
          dob: dob,
          hometown: hometown,
          sigmov: sigmov,
          wins: wins,
          loses: loses,
          nocon: nocon,
          pinsatt: pinsatt,
          pinsatton: pinsatton,
          submissions: submissions,
          submitted: submitted,
          totalmatches: totalmatches,
          champion: champion,
          partner: partner,
          active: active,
          twitter: twitter
        });
      // Clear values
      this.name = "";
      this.nicname = "";
      this.height = "";
      this.weight = "";
      this.dob = "";
      this.hometown = "";
      this.sigmov = "";
      this.wins = "";
      this.loses = "";
      this.nocon = "";
      this.pinsatt = "";
      this.pinsatton = "";
      this.submissions = "";
      this.submitted = "";
      this.totalmatches = "";
      this.champion = "";
      this.partner = "";
      this.active = "";
      this.twitter = "";
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
  padding: 3px;
  margin: 2px;
  color: #333;
}
.addButton {
  background: rgb(57, 127, 184);
  border-radius: 45px;
  box-shadow: 0 0 6px rgb(141, 139, 139);
  padding: 15px 22px;
  font-size: 25px;
  color: #fff;
  border: none;
  position: fixed;
  bottom: 5px;
  right: 5px;
  outline: none;
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
  bottom: 0;
  display: block;
  background: rgba(15, 13, 22, 0.767);
}
form {
  padding: 10px;
  width: 80%;
  margin: 5% auto;
  background: #f2f2f2;
}
.update {
  display: block;
  width: 100%;
  background: rgb(57, 127, 184);
  color: #fff;
  text-transform: uppercase;
  padding: 5px;
  margin-top: 10px;
  text-align: center;
  border: none;
  cursor: pointer;
}
</style>
