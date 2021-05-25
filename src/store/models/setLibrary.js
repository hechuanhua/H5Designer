/**
 * 当前选中的组件
 */
import { createUuid } from '../../utils/index'

const imgItem = {
  id: 0,
  position: {
    x: 0,
    y: 0,
    w: 1,
    h: 119,
    order: 0,
    type: 'img',
    i: 0
  },
  config: {
    url: ''
  }
}

const updata = (id, type) => {

}
// libraryData = {
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
    libraryData: [],
    current: null
  },
  effects: (dispatch) => ({
    editLibrary(payload, rootState) {
    }
  }),
  reducers: {
    add(state, payload) {
      let libraryData = {
        id: payload.id,
        position: payload.position,
        config: {
          type: payload.type,
          url: ''
        }
      }

      return {
        ...state,
        libraryData: [
          ...state.libraryData,
          libraryData
        ],
        current: libraryData,
      }
    },
    edit() {

    },
    setting(state, payload) {
      let obj = JSON.parse(JSON.stringify(state))
      let cur = obj.libraryData.filter(item=>item.id == state.current.id)[0]
      console.log(cur)
      cur.config.url = payload.url
      // let libraryData = [
      //   ...state.libraryData,
      //   {
      //     config: {
      //       ...config,
      //       url: payload.url
      //     }
      //   }
      // ]
      return obj
    }
  },
};
