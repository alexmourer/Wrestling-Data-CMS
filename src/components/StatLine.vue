

<template>
  <div>
    <h1>{{ data.name }}</h1>
    <div class="indStat">
      <div class="statPod" v-for="(line, index) in fieldName" :key="index">
        <StatField
          :label="line.label"
          :data="data[line.dbName]"
          :dbName="line.dbName"
          :type="line.type"
          :name="data.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import StatField from "./StatField";

export default {
  name: "StatLine",
  components: {
    StatField
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      stats: [],
      fieldName: [
        {
          label: "Nickname",
          field: this.data.nicname,
          dbName: "nicname",
          type: "date"
        },
        {
          label: "DOB",
          field: this.data.dob,
          dbName: "dob",
          type: "date"
        },
        {
          label: "Height",
          field: this.data.height,
          dbName: "height",
          type: "number"
        },
        {
          label: "Weight",
          field: this.data.weight,
          dbName: "weight",
          type: "number"
        },
        {
          label: "Wins",
          field: this.data.wins,
          dbName: "wins",
          type: "number"
        },
        {
          label: "Loses",
          field: this.data.loses,
          dbName: "loses",
          type: "number"
        },
        {
          label: "No Contest",
          field: this.data.nocon,
          dbName: "nocon",
          type: "number"
        },
        {
          label: "Total Mathes",
          field: this.data.totalmatches,
          dbName: "totalmatches",
          type: "number"
        },
        {
          label: "Signature Move",
          field: this.data.sigmov,
          dbName: "sigmov",
          type: "text"
        },
        {
          label: "Pins Attempted",
          field: this.data.pinsatt,
          dbName: "pinsatt",
          type: "number"
        },
        {
          label: "Pins Attempted On",
          field: this.data.pinsatton,
          dbName: "pinsatton",
          type: "number"
        },
        {
          label: "Submissions",
          field: this.data.submissions,
          dbName: "submissions",
          type: "number"
        },
        {
          label: "Submitted",
          field: this.data.submitted,
          dbName: "submitted",
          type: "number"
        },
        {
          label: "Partner",
          field: this.data.partner,
          dbName: "partner",
          type: "text"
        },
        {
          label: "Champion",
          field: this.data.champion,
          dbName: "champion",
          type: "text"
        },
        {
          label: "Twitter",
          field: this.data.twitter,
          dbName: "twitter",
          type: "twitter"
        },
        {
          label: "Active",
          field: this.data.active,
          dbName: "active",
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
      partner: "",
      twitter: "",
      active: "",
      editTwitter: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("stats")
    };
  },
  methods: {
    updateWrestler(name, type, nicname) {
      db.collection("stats")
        .doc(name)
        .update({
          [type]: nicname
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
  margin: 0;
  font-size: 1.6em;
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
.editor {
  border: 1px solid #ccc;
}
.indStat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.statPod {
  flex-basis: 20%;
  margin-bottom: 10px;
}
.col {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: bold;
  font-size: 0.8em;
  margin-bottom: 0;
}
span {
  text-align: center;
  margin-bottom: 10px;
}
</style>
