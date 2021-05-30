/**
 * 当前选中的组件
 */

const saveLayout = (data) => {
  localStorage.setItem('layout', JSON.stringify(data))
}

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
      const newState = {
        ...state,
        layoutData: [
          ...state.layoutData,
          payload
        ],
        current: payload,
      }
      console.log(newState,'newState')
      saveLayout(newState.layoutData)
      return newState
    },
    setActive(state, payload) {
      const current = state.layoutData.filter(item => item.id === payload.id)[0]
      return {
        ...state,
        current
      }
    },
    update(state, payload){
      console.log(payload,'update')
      const layoutData = state.layoutData.map(item => {
        if (item.id === payload.id) {
          item.position = { ...item.position, ...payload.position }
        }
        return item
      })
      const current = state.layoutData.filter(item => item.id === payload.id)[0]
      const newState = {
        ...state,
        layoutData,
        current,
      }
      saveLayout(newState.layoutData)
      return newState
    },
    setting(state, payload) {
      const layoutData = state.layoutData.map(item => {
        if (item.id === state.current.id) {
          item.position = { ...item.position, ...payload.position }
          item.config = { ...item.config, ...payload.config}
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
