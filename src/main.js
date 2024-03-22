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
import Vue from "vue";
import VueRouter from "vue-router";
import dayjs from "dayjs";
import App from "./App.vue";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import routes from "./routes/routes";
import "./registerServiceWorker";

// 라이브러리 + 함수
import store from "./module/store" //Vuex : state,mutations,action 함수가 포함된 .js 호출
import createCalculator from "./module/dateCalculator" //dayjs : 사용자 정의 계산식 함수가 포함된 .js 호출
import createfilters from "./module/filters" //사용자정의 테이블 옵션, 필터링, 페이징 함수가 포함된 .js 호출

// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$cal = createCalculator(dayjs);
Vue.prototype.$filter = createfilters();
Vue.prototype.$store = store; // Vuex 스토어를 Vue 프로토타입에 추가

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router
});

