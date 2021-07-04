/**
 * 页面数据
 */
 import { PageData } from '@/typings/PageData'

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
	effects: (dispatch:any) => ({
    async getLayout(payload:any){
      const data =  await getLayoutByTid({tid:payload.tid})
      dispatch({type:'layoutData/switchLayout',payload:data})
    },
    async getHostList(){
      const data =  await getHostList()
      dispatch({type:'pageData/saveHostList',payload:data})
    }
	}),
	reducers: {
    updateHeight(state:PageData, payload:any){
      const newState = {
        ...state,
        pageHeight:payload.pageHeight
      }
      return newState
    },
    setPrint(state:PageData, payload:any){
			const newState = {
				...state,
				print:payload.print
			}
			return newState
		},
    setWechatPopup(state:PageData, payload:any){
      const newState = {
				...state,
				popup: payload.wechatPopup,
			};
			return newState;
    },
    saveHostList(state:PageData, payload:any){
      const newState = {
				...state,
				hostList: payload,
			};
			return newState;
    },
    setContextmenu(state:PageData, payload:any){
      const newState = {
				...state,
				contextmenu: payload,
			};
			return newState;
    }
	},
};


