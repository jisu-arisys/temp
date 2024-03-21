import { reactive } from 'vue'; // Vue 3의 reactive 함수를 가져옵니다.

import Sidebar from './SideBar.vue'
import SidebarLink from './SidebarLink.vue'

// const SidebarStore = {
const SidebarStore = reactive({
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/admin/overview'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
});

const SidebarPlugin = {
  install(app) {
    app.provide('$sidebar', SidebarStore);
    app.component('side-bar', Sidebar);
    app.component('sidebar-link', SidebarLink);
  }
  // install (Vue) {
  //   Vue.mixin({
  //     data () {
  //       return {
  //         sidebarStore: SidebarStore
  //       }
  //     }
  //   })

  //   Object.defineProperty(Vue.prototype, '$sidebar', {
  //     get () {
  //       return this.$root.sidebarStore
  //     }
  //   })
  //   Vue.component('side-bar', Sidebar)
  //   Vue.component('sidebar-link', SidebarLink)
  // }
}

export default SidebarPlugin
