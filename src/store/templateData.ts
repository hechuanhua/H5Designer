/**
 * 模板数据
 */
import { TemplateData } from 'typings/TemplateData'

import { getTemplateList } from 'api'
import config from 'config/config';

export default {
	name: 'templateData',
	state: {
		list: [],  //模板库列表
		popupList: [], //弹窗库列表
		selected: {}//选中的库
	},
	effects: () => ({
		async getTemplateList(payload: any) {
			const data = await getTemplateList({ type: payload.type}) as TemplateData
			data.list.forEach(item => {
				item.cover = config.baseUrl + item.cover
			});
			if(payload.type === 1){
				(this as any).saveLayoutList(data)
			} else if (payload.type === 2){
				(this as any).savePopupList(data)
			}
			
		},
	}),
	reducers: {
		select(state: TemplateData, payload: any) {
			console.log(state, payload, 'select')
			const newState = {
				...state,
				selected: { ...payload }
			}
			return newState
		},
		saveLayoutList(state: TemplateData, payload: any) {
			console.log(state, payload, 'saveList')
			const newState = {
				...state,
				list: [...payload.list]
			}
			return newState
		},
		savePopupList(state: TemplateData, payload: any) {
			console.log(state, payload, 'saveList')
			const newState = {
				...state,
				popupList: [...payload.list]
			}
			return newState
		}
	},
};


