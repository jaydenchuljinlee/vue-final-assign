// vue
import Vue from 'vue';

// vuex
import Vuex from 'vuex';

// state, getters, mutations, actions 파일
import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

// export default store;
