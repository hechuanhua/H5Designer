/**
 * 设置组件布局
 */

const saveLayout = (data) => {
  localStorage.setItem('layout', JSON.stringify(data))
}

export default {
  name: "setLibrary",
  state: {
    layoutData: [],
    newLayoutData:[],
    current: {}
  },
  effects: (dispatch) => ({
    editLibrary(payload, rootState) {
    }
  }),
  reducers: {
    add(state, payload) {
      let newState = {}
      if(payload.type == 'flow'){
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
      console.log(newState,'newState')
      saveLayout(newState.layoutData)
      return newState
    },
    setActive(state, payload) {
      let current = {}
      if(payload.type === 'flow'){
        current = state.layoutData.filter(item => item.id === payload.id)[0]
      } else {
        current = state.newLayoutData.filter(item => item.id === payload.id)[0]
      }
      return {
        ...state,
        current
      }
    },
    update(state, payload){
      console.log(payload,'update')
      let layoutData = []
      let current = {}
      let newState = {}
      if(payload.type === 'flow'){
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
          newLayoutData:layoutData,
          current,
        }
      }
      
      console.log('update modal=>',newState)
      saveLayout(newState.layoutData)
      return newState
    },
    setting(state, payload) {
      let layoutData = []
      let newState = {}
      if(state.current.type === 'flow'){
        layoutData = state.layoutData.map(item => {
          if (item.id === state.current.id) {
            item.position = { ...item.position, ...payload.position }
            item.config = { ...item.config, ...payload.config}
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
            item.config = { ...item.config, ...payload.config}
          }
          return item
        })
        newState = {
          ...state,
          newLayoutData:layoutData
        }
      } 
      
      saveLayout(newState.layoutData)
      return newState
    }
  },
};
