/**
 * 模板数据
 */
 import { getTemplateList } from '../../api'

export default {
	name: 'templateData',
	state: {
		list:[],
		selected:{}
	},
	effects: dispatch => ({
		async getTemplateList(payload, rootState) {
			console.log(payload, rootState)
			const data = await getTemplateList()
			this.saveList(data)
		},
	}),
	reducers: {
		select(state,payload){
			console.log(state,payload,'select')
			const newState = {
				...state,
				selected:{...payload}
			}
			return newState
		},
		saveList(state,payload){
			console.log(state,payload,'saveList')
			const newState = {
				...state,
				list:[...payload.list]
			}
			return newState
		}
	},
};


