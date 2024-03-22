// store/index.js
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    isLoggedIn: true,
    userId: 'user',
  },
  mutations: {
    login(state, userId) {
      state.isLoggedIn = true;
      state.userId = userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
  actions: {
    login({ commit }, userId) {
      // 여기서 세션 일치 여부를 확인하고, 인증이 성공하면 로그인을 합니다.
      // 예를 들어 서버 API를 호출하여 인증을 수행할 수 있습니다.
      // 인증이 성공하면 로그인 상태를 변경하고 사용자 ID를 저장합니다.

      //성공시
      const username = 'user123';
      commit('login', username);
    },
    logout({ commit }) {
      // 로그아웃 액션
      commit('logout');
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
  },
});
