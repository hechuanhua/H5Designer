/**
 * 页面数据
 */

 import initData from '../../config/initData';
 import { getLayoutByTid, getHostList } from '../../api'

export default {
	name: 'pageData',
	state: {
		pageHeight:initData.height,
    print:true,
    wechatPopup:false,
    hostList:[],
    contextmenu:{
      isShow:false,
      x:0,
      y:0
    },
	},
	effects: dispatch => ({
    async getLayout(payload,rootState){
      const data =  await getLayoutByTid({tid:payload.tid})
      dispatch({type:'layoutData/switchLayout',payload:data})
    },
    async getHostList(payload,rootState){
      const data =  await getHostList()
      dispatch({type:'pageData/saveHostList',payload:data})
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
			return newState
		},
    setWechatPopup(state, payload){
      const newState = {
				...state,
				popup: payload.wechatPopup,
			};
			return newState;
    },
    saveHostList(state, payload){
      const newState = {
				...state,
				hostList: payload,
			};
			return newState;
    },
    setContextmenu(state, payload){
      const newState = {
				...state,
				contextmenu: payload,
			};
			return newState;
    }
	},
};


