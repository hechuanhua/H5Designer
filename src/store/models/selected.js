/**
 * 当前选中的组件
 */
 import { init, getState } from '@rematch/core'

const initState = {
  type:'',
  order:0,
};

export const userInfoModal = {
  name: "selected",
  state: initState,
  effects: (dispatch) => ({
    async incrementAsync(payload, rootState) {
      console.log(payload,rootState,77777)
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  }),
  reducers: {
    add(state, payload,rootState) {
      console.log(state,rootState,1111)
      let order = state.order + 1
      return {
        ...state,
        ...payload,
      };
    },
  },
};
