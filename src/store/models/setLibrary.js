/**
 * 当前选中的组件
 */

 const initState = {
  type:'',
  order:0,
};
const item = {
  l:0,
  t:0,
  w:200,
  h:100,
  order:0,
  type:''
}
const json = {
  img:{
    
  }
}
export default {
  name: "selected",
  state: [],
  effects: (dispatch) => ({
    addLibrary(payload, rootState) {
      console.log(payload,rootState,77777)
      const data = {
        ...payload,
        ...rootState.setType
      }
      this.add(data)
    },
    editLibrary(payload, rootState){

    }
  }),
  reducers: {
    add(state, payload) {
      console.log(state,payload,1111)
      const data = {
        ...item,
        ...payload
      }
      state.push(data)
      return state
    },
    edit(){

    }
  },
};
