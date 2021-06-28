/**
 * 组件布局数据
 */

const saveLayout = data => {
	localStorage.setItem('layout', JSON.stringify(data));
};

let initData = {
	flowLayout: [],
	freedomLayout: [],
	current: {},
	layoutType: 'freedom'
};

if (localStorage.getItem('layout')) {
	initData = JSON.parse(localStorage.getItem('layout'));
}

export default {
	name: 'layoutData',
	state: initData,
	effects: dispatch => ({
		// saveTemplateData(payload, rootState) {
		// 	console.log(payload, rootState)
		// 	return saveTemplate({
		// 		title:payload.title,
		// 		layoutData:rootState.layoutData,
		// 		base64:payload.base64
		// 	})
		// },
	}),
	reducers: { 
		add(state, payload) {
			let newState = {};
			if (payload.type === 'flow') {
				newState = {
					...state,
					flowLayout: [...state.flowLayout, payload],
					current: payload,
				};
			} else {
				newState = {
					...state,
					freedomLayout: [...state.freedomLayout, payload],
					current: payload,
				};
			}
			saveLayout(newState);
			return newState;
		},
		remove(state, payload) {
			let newState = {};
			if (payload.type === 'flow') {
				const flowLayout = state.flowLayout.filter(item => item.id !== payload.id);
				newState = {
					...state,
					flowLayout,
					current: {},
				};
			} else {
				const freedomLayout = state.freedomLayout.filter(item => item.id !== payload.id);
				newState = {
					...state,
					freedomLayout,
					current: {},
				};
			}
			saveLayout(newState);
			return newState;
		},
		setActive(state, payload) {
			console.log(state.current, payload, 'setActivesetActive');
			let current = {};
			if (payload.type === 'flow') {
				current = state.flowLayout.filter(item => item.id === payload.id)[0];
			} else {
				current = state.freedomLayout.filter(item => item.id === payload.id)[0];
			}
			console.log(current)
			if(!current){
				current = []
			}
			return {
				...state,
				current,
			};
		},
		update(state, payload) {
			let current = {};
			let newState = {};
			if (payload.type === 'flow') {
				const flowLayout = state.flowLayout.map(item => {
					if (item.id === state.current.id) {
						item.position = { ...item.position, ...payload.position };
					}
					return item;
				});
				current = state.flowLayout.filter(item => item.id === state.current.id)[0];
				newState = {
					...state,
					flowLayout,
					current,
				};
			} else {
				const freedomLayout = state.freedomLayout.map(item => {
					if (item.id === payload.id) {
						item.position = { ...item.position, ...payload.position };
					}
					return item;
				});
				current = state.freedomLayout.filter(item => item.id === payload.id)[0];
				newState = {
					...state,
					freedomLayout,
					current,
				};
			}
			saveLayout(newState);
			return newState;
		},
		setting(state, payload) {
			let newState = {};
      let current = {}
			console.log(state.current.id, payload, state.freedomLayout, 'payloadpayloadpayload');
			if (state.current.type === 'flow') {
				const flowLayout = state.flowLayout.map(item => {
					if (item.id === state.current.id) {
						item.position = { ...item.position, ...payload.position };
						item.config = { ...item.config, ...payload.config };
            current = {...item}
					}
					return item;
				});
				newState = {
					...state,
					flowLayout,
				};
			} else {
				const freedomLayout = state.freedomLayout.map(item => {
					if (item.id === state.current.id) {
						item.position = { ...item.position, ...payload.position };
						item.config = { ...item.config, ...payload.config };
            current = {...item}
					}
					return item;
				});

				newState = {
					...state,
          current,
					freedomLayout,
				};
			}

			saveLayout(newState);
			return newState;
		},
		setType(state, payload) {
			const newState = {
				...state,
				layoutType: payload.layoutType,
			};
      saveLayout(newState);
			return newState;
		},
		clearAllData(){
			const newState = {
				flowLayout: [],
				freedomLayout: [],
				current: {},
				layoutType: 'freedom'
			};
			saveLayout(newState);
			return newState
		},
		switchLayout(state, payload){
			console.log(payload.layout_data,'payload.layout_data')
			console.log(JSON.parse(payload.layout_data),'JSON.parse(payload.layout_data)')
			const newState = JSON.parse(payload.layout_data)
			newState.current = []
			saveLayout(newState);
			return newState
		},
	},
};
