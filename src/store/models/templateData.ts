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
		selected: {}, //选中的库
		popupList: [] //弹窗库列表
	},
	effects: () => ({
		async getTemplateList() {
			const data = await getTemplateList() as TemplateData
			data.list.forEach(item => {
				item.cover = config.baseUrl + item.cover
			});
			(this as any).saveList(data)
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
		saveList(state: TemplateData, payload: any) {
			console.log(state, payload, 'saveList')
			const newState = {
				...state,
				list: [...payload.list]
			}
			return newState
		}
	},
};


