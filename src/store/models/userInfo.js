

/**
 * 登录模块
 */


const userInfo = {}
const state = {
  ...userInfo
}

export const userInfoModal  = {
  name:'userInfo',
  state: state, 
  effects: dispatch => ({
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  }),
  reducers: {
    saveUserInfo(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
    clearUserInfo(){
      console.log('clearUserInfo')
      Taro.clearStorageSync()
      return {}
    }
  }
}
