/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.1.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { createApp } from 'vue'; //vue3
// import { createRouter, createWebHistory } from 'vue-router'; // Vue Router 4
import App from "./App.vue";

import LightBootstrap from "./light-bootstrap-main";
import "./registerServiceWorker";
import dayjs from "dayjs"
import axios from 'axios';
import router from './routes/routes';


  // vue 앱 생성
  const app = createApp(App);

  // Vue Router 설정
  // const router = createRouter({
  //   history: createWebHistory(),
  //   routes: [],
  // });

//플러그인, 라이브러리, 전역변수 설정
app.use(router);
app.use(LightBootstrap);
app.use(dayjs);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = '//localhost:8080';

// Vue 인스턴스 마운트
app.mount('#app');


