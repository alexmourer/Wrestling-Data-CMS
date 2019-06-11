<template>
  <div class="dataPiece">
    <span class="label">{{label}}</span>
    <transition name="fade">
      <div v-if="data">
        <span class="dataRead" v-if="!editData" @click="editData = true; setFocus()">{{data}}</span>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!data">
        <span class="dataRead" v-if="!editData" @click="editData = true; setFocus()">N/A</span>
      </div>
    </transition>

    <input
      ref="dataInput"
      v-if="editData && type=='text'"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >
  </div>
</template>

<script>
import { db } from "../main";
import RosterInput from "./input_RosterChoice";

export default {
  name: "Showfield",
  components: {
    RosterInput
  },
  props: {
    label: {
      type: String
    },
    data: {
      type: String
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    dbName: {
      type: String
    },
    matchTitle: {
      type: String
    }
  },
  data() {
    return {
      stats: [],
      editData: false,
      inputData: this.data
    };
  },
  firestore() {
    return {
      stats: db.collection("shows")
    };
  },
  methods: {
    updateWrestler(value) {
      db.collection("shows")
        .doc(this.name)
        .collection("matches")
        .doc(this.matchTitle)
        .update({
          [this.dbName]: value
        });
      // Clear values
    },
    setFocus() {
      this.$nextTick(() => {
        this.$refs.dataInput.focus();
      });
    }
  }
};
</script>

<style scoped>
div {
  text-align: left;
}
.dataPiece {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: bold;
  font-size: 0.65em;
  margin-bottom: 0;
  color: #aaacaf;
}
span {
  text-align: left;
  margin-bottom: 10px;
}
.dataRead {
  background: #e9e9ec;
  padding: 2px 4px;
  /* display: block; */
  border-radius: 2px;
  color: #000;
  display: block;
  border: 1px solid #dbdbde;
  font-family: Consolas;
  font-size: 0.9em;
}
input,
select {
  display: block;
  font-size: 0.9em;
  text-align: left;
  background: rgb(250, 250, 250);
}
input:focus,
select:focus {
  outline: none !important;
  border: 1px solid #000;
  display: block;
}
</style>