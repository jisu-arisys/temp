// store/index.js
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    isLoggedIn: true,
    userId: 'user',
    isSavedId: true
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
    savedIdLogout(state) {
      state.isLoggedIn = false;
    },
    savingId(){
      state.isSavedId = true;
    },
    notSavingId(){
      state.isSavedId = false;
    }
  },
  actions: {
    login({ commit }, userId) {
      // 여기서 세션 일치 여부를 확인하고, 인증이 성공하면 로그인을 합니다.
      // 예를 들어 서버 API를 호출하여 인증을 수행할 수 있습니다.
      // 인증이 성공하면 로그인 상태를 변경하고 사용자 ID를 저장합니다.

      //성공시
      const username = userId;
      commit('login', username);
    },
    logout({ commit , state}) {
      // 로그아웃 액션
      if(state.isSavedId){
        commit('logout');
      }else{
        commit('savedIdLogout');
      }
    },
    savingId({commit}, boolean){
      if(boolean){
        commit('savingId');
      }else{
        commit('notSavingId');
      }
    },

    
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    isSavedId: state => state.isSavedId,
  },
});
