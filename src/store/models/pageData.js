/**
 * 页面数据
 */

 import initData from '../../config/initData';
 import { getLayoutByTid } from '../../api'

export default {
	name: 'pageData',
	state: {
		pageHeight:initData.height
	},
	effects: dispatch => ({
    async getLayout(payload,rootState){
      const data =  await getLayoutByTid({tid:payload.tid})
      dispatch({type:'layoutData/switchLayout',payload:data})
    }
	}),
	reducers: {
    updateHeight(state, payload){
      const newState = {
        ...state,
        pageHeight:payload.pageHeight
      }
      return newState
    }
	},
};


