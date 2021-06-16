/**
 * 页面数据
 */

 import initData from '../../config/initData';

export default {
	name: 'pageData',
	state: {
		pageHeight:initData.height
	},
	effects: dispatch => ({
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


