/**
 * 设置组件布局
 */

const saveLayout = (data) => {
  localStorage.setItem('layout', JSON.stringify(data))
}
// {"layoutData":[{"id":"671868","position":{"x":12,"y":0,"w":50,"h":238,"i":"671868"},"config":{"type":"img","url":"https://dummyimage.com/500x240"},"type":"flow"},{"id":"432600","position":{"x":5,"y":238,"w":20,"h":40,"i":"432600"},"config":{"type":"text","text":"我是测试文字111"},"type":"flow"}],"newLayoutData":[{"id":"367481","position":{"x":0,"y":25,"w":200,"h":40,"i":"367481"},"config":{"type":"text","text":"我是测试文字2222"},"type":"freedom"},{"id":"908797","position":{"x":300,"y":80,"w":200,"h":40,"i":"908797"},"config":{"type":"text","text":"我是测试文字3333"},"type":"freedom"},{"id":"479011","position":{"x":30,"y":123,"w":401,"h":150,"i":"479011"},"config":{"type":"radio","title":"我是单选字段标题","list":[{"label":"我是字段122"},{"label":"我是字段233"},{"label":"我是字段344"}],"layoutType":"1"},"type":"freedom"}],"current":{"id":"479011","position":{"x":30,"y":123,"w":401,"h":150,"i":"479011"},"config":{"type":"radio","title":"我是单选字段标题","list":[{"label":"我是字段122"},{"label":"我是字段233"},{"label":"我是字段344"}],"layoutType":"1"},"type":"freedom"}}
// const initData = JSON.parse(localStorage.getItem('layout'))
const initData = {
  layoutData: [],
  newLayoutData: [],
  current: {}
}
export default {
  name: "setLibrary",
  state: initData,
  effects: (dispatch) => ({
    editLibrary(payload, rootState) {
    }
  }),
  reducers: {
    add(state, payload) {
      let newState = {}
      if (payload.type === 'flow') {
        newState = {
          ...state,
          layoutData: [
            ...state.layoutData,
            payload
          ],
          current: payload,
        }
      } else {
        newState = {
          ...state,
          newLayoutData: [
            ...state.newLayoutData,
            payload
          ],
          current: payload,
        }
      }
      console.log(newState, 'newState')
      saveLayout(newState)
      return newState
    },
    remove(state, payload) {
      let newState = {}
      if (payload.type === 'flow') {
        const layoutData = state.layoutData.filter(item => item.id !== payload.id)
        newState = {
          ...state,
          layoutData,
          current:{},
        }
      } else {
        const newLayoutData = state.newLayoutData.filter(item => item.id !== payload.id)
        newState = {
          ...state,
          newLayoutData,
          current:{},
        }
      }
      saveLayout(newState)
      return newState
    },
    setActive(state, payload) {
      let current = {}
      if (payload.type === 'flow') {
        current = state.layoutData.filter(item => item.id === payload.id)[0]
      } else {
        current = state.newLayoutData.filter(item => item.id === payload.id)[0]
      }
      return {
        ...state,
        current
      }
    },
    update(state, payload) {
      console.log(payload, 'update')
      let layoutData = []
      let current = {}
      let newState = {}
      if (payload.type === 'flow') {
        layoutData = state.layoutData.map(item => {
          if (item.id === payload.id) {
            item.position = { ...item.position, ...payload.position }
          }
          return item
        })
        current = state.layoutData.filter(item => item.id === payload.id)[0]
        newState = {
          ...state,
          layoutData,
          current,
        }
      } else {
        layoutData = state.newLayoutData.map(item => {
          if (item.id === payload.id) {
            item.position = { ...item.position, ...payload.position }
          }
          return item
        })
        current = state.newLayoutData.filter(item => item.id === payload.id)[0]
        newState = {
          ...state,
          newLayoutData: layoutData,
          current,
        }
      }

      console.log('update modal=>', newState)
      saveLayout(newState)
      return newState
    },
    setting(state, payload) {
      let layoutData = []
      let newState = {}
      if (state.current.type === 'flow') {
        layoutData = state.layoutData.map(item => {
          if (item.id === state.current.id) {
            item.position = { ...item.position, ...payload.position }
            item.config = { ...item.config, ...payload.config }
          }
          return item
        })
        newState = {
          ...state,
          layoutData
        }
      } else {
        layoutData = state.newLayoutData.map(item => {
          if (item.id === state.current.id) {
            item.position = { ...item.position, ...payload.position }
            item.config = { ...item.config, ...payload.config }
          }
          return item
        })
        newState = {
          ...state,
          newLayoutData: layoutData
        }
      }

      saveLayout(newState)
      return newState
    }
  },
};
