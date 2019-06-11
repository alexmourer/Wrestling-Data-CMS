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
    <input
      type="number"
      step="1"
      ref="dataInput"
      v-if="editData && type=='number'"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >
    <input
      type="text"
      ref="dataInput"
      v-if="editData && type=='date'"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >

    <input
      type="checkbox"
      name="active"
      ref="dataInput"
      v-if="editData && type=='active'"
      @change="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >
    <!-- <label v-if="editData && type=='active'" for="active">{{label}}</label> -->
    <input
      ref="dataInput"
      v-if="editData && type=='choice'"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >
    <input
      ref="dataInput"
      v-if="editData && type=='twitter'"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      tabindex="0"
    >
    <select
      ref="dataInput"
      v-if="editData && type=='partner'"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      @change="updateWrestler(inputData);editData = false"
    >
      <option v-for="(stat, index) in stats" :key="index">{{stat.name}}</option>
    </select>

    <select
      ref="dataInput"
      v-if="editData && type=='champ'"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      @change="updateWrestler(inputData);editData = false"
    >
      <option>N/A</option>
      <option>AEW World Championship</option>
      <option>AEW Women's Champonship</option>
      <option>AEW Tag Champion</option>
    </select>

    <select
      ref="dataInput"
      v-if="editData && type=='entrytype'"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      @change="updateWrestler(inputData);editData = false"
    >
      <option>Individual</option>
      <option>Tag</option>
    </select>

    <select
      ref="dataInput"
      v-if="editData && type=='gender'"
      v-model="inputData"
      @blur="updateWrestler(inputData); editData = false"
      @focusout="updateWrestler(inputData); editData = false"
      @change="updateWrestler(inputData);editData = false"
    >
      <option>Male</option>
      <option>Female</option>
    </select>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "HelloWorld",
  props: {
    label: {
      type: String
    },
    data: {
      type: [String, Number, Boolean]
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    dbName: {
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
      stats: db.collection("stats")
    };
  },
  methods: {
    updateWrestler(value) {
      db.collection("stats")
        .doc(this.name)
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