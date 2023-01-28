import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "webrtc-adapter";

// import io from 'socket.io';
// const socket = io("/", {transports:['websocket'], path: '/socket'});

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount("#app");
