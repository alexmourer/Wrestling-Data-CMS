

<template>
  <div>
    <span @click="statShow = !statShow;" v-if="!statShow" class="expand">+</span>
    <span @click="statShow = !statShow;" v-if="statShow" class="expand minus">-</span>
    <h1 @click="statShow = !statShow;">
      {{ data.name }}
      <span v-if="data.date">- {{data.date }}</span>
    </h1>
    <div v-if="statShow">
      <div class="indStat">
        <div class="statPod" v-for="(line, index) in fieldName" :key="index">
          <ShowField
            :label="line.label"
            :data="data[line.dbName]"
            :dbName="line.dbName"
            :type="line.type"
            :name="data.name"
          />
        </div>
      </div>
      <div class="matches">
        <h3>Matches</h3>
        <div class="statPod" v-for="(match, index) in matches" :key="index">
          <ShowMatchLine :data="match" :show="data.name"/>
        </div>
        <ShowMatchAdd :showdata="data.name"/>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import ShowField from "./ShowField";
import ShowMatchLine from "./ShowMatchLine";
import ShowMatch from "./ShowMatch";
import ShowMatchAdd from "./ShowMatchAdd";

export default {
  name: "ShowLine",
  components: {
    ShowField,
    ShowMatch,
    ShowMatchLine,
    ShowMatchAdd
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      stats: [],
      matches: [],
      fieldName: [
        {
          label: "Show Type",
          field: this.data.showtype,
          dbName: "showtype",
          type: "showtype"
        },
        {
          label: "Date",
          field: this.data.date,
          dbName: "date",
          type: "text"
        },
        {
          label: "Location",
          field: this.data.location,
          dbName: "location",
          type: "text"
        },
        {
          label: "Start Time",
          field: this.data.starttime,
          dbName: "starttime",
          type: "text"
        },
        {
          label: "Run Time",
          field: this.data.runtime,
          dbName: "runtime",
          type: "text"
        },
        {
          label: "Show Completed",
          field: this.data.completed,
          dbName: "completed",
          type: "active"
        }
      ],

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
      tagchampion: "",
      partner: "",
      twitter: "",
      tagteam: "",
      active: "",
      statShow: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("shows"),
      matches: db
        .collection("shows")
        .doc(this.data.name)
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
  margin: 0;
  padding: 0;
  color: rgb(137, 142, 151);
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
  padding: 0px 4px 2px;
  float: left;
  text-align: center;
  line-height: 15px;
  font-size: 1em;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 7px;
  cursor: pointer;
}
.expand.minus {
  padding: 0px 6px 3px;
}
.indStat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
}
.statPod {
  flex-basis: 30%;
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
.matches {
  font-size: 0.95em;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.matches .statPod {
  padding: 7px;
  border-bottom: 1px solid #000;
}
.matches .statPod:nth-child(odd) {
}
@media only screen and (max-width: 650px) {
  .statPod {
    flex-basis: 30%;
    margin-bottom: 8px;
  }
}
</style>
