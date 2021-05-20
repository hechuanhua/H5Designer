/**
 * 设置当前选择的组件
 */

const initState = {
  type:'',
  order:0,
};

export const setTypeModal = {
  name: "setType",
  state: initState,
  effects: (dispatch) => ({
    // addLibrary(payload, rootState) {
    //   console.log(payload,rootState,77777)
    //   this.increment(payload)
    // },
    // editLibrary(payload, rootState){

    // }
  }),
  reducers: {
    setType(state, payload) {
      let order = state.order + 1
      return {
        ...state,
        order,
        type:payload.type,
      };
    },
    edit(){

    }
  },
};
