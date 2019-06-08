import Vue from "vue";
import App from "./App";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCWoI7fQWjDBV9LlIDZrbnBW9WgZdNyuWg",
    authDomain: "aew-data.firebaseapp.com",
    databaseURL: "https://aew-data.firebaseio.com",
    projectId: "aew-data",
    storageBucket: "aew-data.appspot.com",
    messagingSenderId: "394497929952",
    appId: "1:394497929952:web:085eb527d7deacfd"
  })
  .firestore();

console.log(db);
new Vue({
  render: h => h(App)
}).$mount("#app");
