/**
 * 页面数据
 */

 import initData from '../../config/initData';
 import { getLayoutByTid } from '../../api'

  const saveLayout = data => {
    localStorage.setItem('layout', JSON.stringify(data));
  };

export default {
	name: 'pageData',
	state: {
		pageHeight:initData.height,
    print:true,
    wechatPopup:false
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
    },
    setPrint(state, payload){
			const newState = {
				...state,
				print:payload.print
			}
			// saveLayout(newState);
			return newState
		},
    setWechatPopup(state, payload){
      const newState = {
				...state,
				popup: payload.wechatPopup,
			};
      // saveLayout(newState);
			return newState;
    },
	},
};


