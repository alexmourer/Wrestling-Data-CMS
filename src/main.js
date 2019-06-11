import Vue from "vue";
import App from "./App";
import router from "./router";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import VueAnalytics from "vue-analytics";

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

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));

  next();
});

Vue.use(VueAnalytics, {
  id: "UA-141778945-1",
  router
});

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
