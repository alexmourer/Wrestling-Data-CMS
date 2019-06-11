

<template>
  <div>
    <span @click="statShow = !statShow;" v-if="!statShow" class="expand">+</span>
    <span @click="statShow = !statShow;" v-if="statShow" class="expand minus">-</span>
    <h1 @click="statShow = !statShow;">{{ data.name }}</h1>

    <div v-if="data.entrytype != 'Tag' && statShow" class="indStat">
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
    <div class="tagStat" v-if="data.entrytype == 'Tag' && statShow">
      <div class="statPod" v-for="(tag, index) in tagFields" :key="index">
        <StatField
          :label="tag.label"
          :data="data[tag.dbName]"
          :dbName="tag.dbName"
          :type="tag.type"
          :name="data.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
          label: "Entry Type",
          field: this.data.entrytype,
          dbName: "entrytype",
          type: "entrytype"
        },
        {
          label: "Gender",
          field: this.data.gender,
          dbName: "gender",
          type: "gender"
        },
        {
          label: "DOB",
          field: this.data.dob,
          dbName: "dob",
          type: "date"
        },
        {
          label: "Nickname",
          field: this.data.nicname,
          dbName: "nicname",
          type: "date"
        },
        {
          label: "Hometown",
          field: this.data.hometown,
          dbName: "hometown",
          type: "text"
        },
        {
          label: "Signature Move",
          field: this.data.sigmov,
          dbName: "sigmov",
          type: "text"
        },
        {
          label: "Height",
          field: this.data.height,
          dbName: "height",
          type: "text"
        },
        {
          label: "Weight",
          field: this.data.weight,
          dbName: "weight",
          type: "text"
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
          label: "DQ",
          field: this.data.dq,
          dbName: "dq",
          type: "number"
        },
        {
          label: "No Contest",
          field: this.data.nocon,
          dbName: "nocon",
          type: "number"
        },
        {
          label: "Total Matches",
          field: this.data.totalmatches,
          dbName: "totalmatches",
          type: "number"
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
          label: "Times Submitted",
          field: this.data.submitted,
          dbName: "submitted",
          type: "number"
        },
        {
          label: "Champion",
          field: this.data.champion,
          dbName: "champion",
          type: "champ"
        },
        {
          label: "Twitter",
          field: this.data.twitter,
          dbName: "twitter",
          type: "twitter"
        },
        {
          label: "Trained by",
          field: this.data.trained,
          dbName: "trained",
          type: "text"
        },
        {
          label: "Debut",
          field: this.data.debut,
          dbName: "debut",
          type: "text"
        },
        {
          label: "Merch URL",
          field: this.data.merch,
          dbName: "merch",
          type: "text"
        },
        {
          label: "Active",
          field: this.data.active,
          dbName: "active",
          type: "active"
        }
      ],
      tagFields: [
        {
          label: "Entry Type",
          field: this.data.entrytype,
          dbName: "entrytype",
          type: "entrytype"
        },
        {
          label: "Members",
          field: this.data.partner,
          dbName: "partner",
          type: "text"
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
          label: "Tag Champions",
          field: this.data.tagchampion,
          dbName: "tagchampion",
          type: "active"
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
      tagchampion: "",
      partner: "",
      twitter: "",
      tagteam: "",
      active: "",
      statShow: "",
      searchText: ""
    };
  },
  firestore() {
    return {
      stats: db.collection("stats")
    };
  },
  methods: {
    updateWrestler(name, type, value) {
      db.collection("stats")
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
}
.statPod {
  flex-basis: 18%;
  margin-bottom: 8px;
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
  margin-bottom: 15px;
}
@media only screen and (max-width: 650px) {
  .statPod {
    flex-basis: 30%;
    margin-bottom: 8px;
  }
}
</style>
