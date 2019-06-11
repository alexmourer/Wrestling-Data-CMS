<template>
  <input
    ref="dataInput"
    v-on:keyup.enter.prevent="updateWrestler(inputData);editData = false"
    v-model="inputData"
    @blur="updateWrestler(inputData); editData = false"
    @focusout="updateWrestler(inputData); editData = false"
    tabindex="0"
  >
</template>