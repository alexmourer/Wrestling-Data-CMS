<template>
  <div class="dataPiece">
    <span class="label">{{label}}</span>
    <div v-if="data">
      <span v-if="!editData" @dblclick="editData = true; setFocus()">{{data}}</span>
    </div>
    <div v-if="!data">
      <span v-if="!editData" @dblclick="editData = true; setFocus()">N/A</span>
    </div>
    <input
      ref="dataInput"
      v-if="editData"
      v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
      v-model="inputData"
      @blur="editData = false"
      @focusout="editData = false"
      tabindex="0"
    >
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "HelloWorld",
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
    }
  },
  data() {
    return {
      stats: [],
      editData: false,
      inputData: this.data
    };
  },
  watch: {
    data: function(val) {}
  },
  firestore() {
    return {
      stats: db.collection("stats")
    };
  },
  methods: {
    updateWrestler(value) {
      console.log(value);
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
  text-align: center;
}
.dataPiece {
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
  margin-bottom: 20px;
}
input {
  max-width: 55px;
  margin: auto;
  text-align: center;
  border: 1px solid rgb(57, 127, 184);
}
</style>