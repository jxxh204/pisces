import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
// import router from "./router";

import "./assets/main.css";
import "webrtc-adapter";
import mitt from "mitt"; // Import mitt
import VueMeta from 'vue-meta'

// Vue.use(VueMeta)
const emitter = mitt(); // Initialize mitt

// import io from 'socket.io';
// const socket = io("/", {transports:['websocket'], path: '/socket'});

const app = createApp(App);
app.use(createPinia());

app.provide("emitter", emitter); // ✅ Provide as `emitter`
// app.use(router);

app.mount("#app");
