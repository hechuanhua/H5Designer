/**
 * 当前选中的组件
 */

 const initState = {
  type:'',
  order:0,
};
const item = {
  x:0,
  y:0,
  w:0,
  h:0,
  order:0,
  type:''
}
export const userInfoModal = {
  name: "selected",
  state: initState,
  effects: (dispatch) => ({
    addLibrary(payload, rootState) {
      console.log(payload,rootState,77777)
      this.increment(payload)
    },
    editLibrary(payload, rootState){

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
    edit(){

    }
  },
};
