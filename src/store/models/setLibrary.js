/**
 * 当前选中的组件
 */
import { createUuid } from '../../utils/index'
import _ from 'lodash'

const saveLayout = (data) => {
  localStorage.setItem('layout',JSON.stringify(data))
}

// layoutData = {
//   id:0,
//   position:{
//     x:0,
//     y:0,
//     t:0,
//     l:0,
//     i:0
//   },
//   config:{
//     type:'img',
//     url:''
//   }
// }
export default {
  name: "setLibrary",
  state: {
    layoutData: [],
    current: {}
  },
  effects: (dispatch) => ({
    editLibrary(payload, rootState) {
    }
  }),
  reducers: {
    add(state, payload) {
      const layoutData = {
        id: payload.id,
        position: payload.position,
        config: {
          type: payload.type,
          url: ''
        }
      }
      const newState = {
        ...state,
        layoutData: [
          ...state.layoutData,
          layoutData
        ],
        current: layoutData,
      }
      saveLayout(newState.layoutData)
      return newState
    },
    setActive(state, payload) {
      const current = state.layoutData.filter(item=>item.id === payload.id)[0]
      console.log(current,'current')
      return {
        ...state,
        current
      }
    },
    setting(state, payload) {
      const layoutData = state.layoutData.map(item=>{
        if(item.id === state.current.id){
          item.position = {...item.position,...payload.position}
          item.config.url = payload.config.url
        }
        return item
      })
      const newState = {
        ...state,
        layoutData
      }
      saveLayout(newState.layoutData)
      return newState
    }
  },
};
