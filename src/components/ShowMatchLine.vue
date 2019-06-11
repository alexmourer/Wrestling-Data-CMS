

<template>
  <div>
    <span @click="indMatchVis = !indMatchVis;" v-if="!indMatchVis" class="expand">+</span>
    <span @click="indMatchVis = !indMatchVis;" v-if="indMatchVis" class="expand minus">-</span>
    <h3 @click="indMatchVis = !indMatchVis;">{{ data.matchtitle }}</h3>
    <div class="indStat" v-if="indMatchVis">
      <div class="statPod" v-for="(matchField, index) in matchData" :key="index">
        <ShowMatch
          :label="matchField.label"
          :data="data[matchField.dbName]"
          :dbName="matchField.dbName"
          :type="matchField.type"
          :name="show"
          :matchTitle="data.matchtitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import ShowField from "./ShowField";
import ShowMatch from "./ShowMatch";
import ShowMatchAdd from "./ShowMatchAdd";

export default {
  name: "ShowMatchLine",
  components: {
    ShowMatch
  },
  props: {
    data: {
      type: Object
    },
    show: {
      type: String
    }
  },
  data() {
    return {
      stats: [],
      matches: [],

      matchData: [
        {
          label: "Match Title",
          field: this.data.matchtitle,
          dbName: "matchtitle",
          type: "text"
        },
        {
          label: "Stipulation",
          field: this.data.stipulation,
          dbName: "stipulation",
          type: "text"
        },
        {
          label: "Championship",
          field: this.data.championship,
          dbName: "championship",
          type: "text"
        },
        {
          label: "Participants",
          field: this.data.participants,
          dbName: "particpants",
          type: "text"
        },
        {
          label: "Winner",
          field: this.data.matchwinner,
          dbName: "matchwinner",
          type: "text"
        },
        {
          label: "Win Method",
          field: this.data.winmethod,
          dbName: "winmethod",
          type: "text"
        },
        {
          label: "Match Length",
          field: this.data.matchlength,
          dbName: "matchlength",
          type: "text"
        }
      ],
      active: "",
      statShow: "",
      indMatchVis: false
    };
  },
  firestore() {
    return {
      stats: db.collection("shows"),
      matches: db
        .collection("shows")
        .doc(this.show)
        .collection("matches")
    };
  },
  methods: {
    updateWrestler(name, type, value) {
      db.collection("shows")
        .doc(name)
        .update({
          [type]: value
        });
      // Clear values
      this.name = "";
      this.nicname = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 5px 0;
  font-size: 1.2em;
  cursor: pointer;
}
h3 {
  font-size: 0.9em;
  margin: 0px 0px 0 0px;
  padding: 0px 0 0 0;
  color: #000;
  cursor: pointer;
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
.expand {
  border: 2px solid #000;
  border-radius: 25px;
  padding: 0px 3px 1px;
  float: left;
  text-align: center;
  line-height: 13px;
  font-size: 0.8em;
  font-weight: bold;
  margin-top: 1px;
  margin-right: 7px;
  cursor: pointer;
}
.expand.minus {
  padding: 0px 4px 3px;
  line-height: 11px;
}
.indStat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 7px;
  clear: both;
}
.statPod {
  flex-basis: 18%;
  margin-bottom: 8px;
  clear: both;
}

.tagStat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tagStat .statPod {
  flex-basis: 33%;
  margin-bottom: 8px;
}
.col {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: bold;
  font-size: 0.6em;
  margin-bottom: 0;
  text-transform: lowercase;
  color: rgb(146, 156, 163);
}
span {
  text-align: center;
}
@media only screen and (max-width: 650px) {
  .statPod {
    flex-basis: 30%;
    margin-bottom: 8px;
  }
}
</style>
