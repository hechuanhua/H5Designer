/**
 * 模板数据
 */
 import { TemplateData } from '../../typings/TemplateData'

 import { getTemplateList } from '../../api'
 import config from '../../config/config';

export default {
	name: 'templateData',
	state: {
		list:[],
		selected:{}
	},
	effects: () => ({
		async getTemplateList() {
			const data = await getTemplateList() as TemplateData
			data.list.forEach(item=>{
				item.cover = config.baseUrl + item.cover
			});
			(this as any).saveList(data)
		},
	}),
	reducers: {
		select(state:TemplateData,payload:any){
			console.log(state,payload,'select')
			const newState = {
				...state,
				selected:{...payload}
			}
			return newState
		},
		saveList(state:TemplateData,payload:any){
			console.log(state,payload,'saveList')
			const newState = {
				...state,
				list:[...payload.list]
			}
			return newState
		}
	},
};


