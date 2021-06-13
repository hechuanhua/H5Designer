/**
 * 设置组件布局
 */
 import { saveTemplate } from '../../api'

const saveLayout = data => {
	localStorage.setItem('layout', JSON.stringify(data));
};

let initData = {
	layoutData: [],
	freedomLayout: [],
	current: {},
	layoutType: 'freedom',
  popup:false
};

if (localStorage.getItem('layout')) {
	initData = JSON.parse(localStorage.getItem('layout'));
}
// 模块1
// initData = {"layoutData":[],"freedomLayout":[{"id":"617978","position":{"x":0,"y":0,"w":375,"h":22,"i":"617978"},"config":{"type":"text","text":"<p style=\"margin-bottom: 0px; font-family: &quot;microsoft yahei&quot;; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; color: rgb(204, 204, 204);\">深圳市有颜网络科技有限公司</p>","align":"center","fontSize":"14","backgroundColor":"#fff","color":"#000","fixed":"","bottomY":0,"borderRadius":0,"popup":false},"type":"freedom"},{"id":"972929","position":{"x":43,"y":22,"w":293,"h":200,"i":"972929"},"config":{"type":"img","url":"http://192.168.1.134:7001/public/uploads/ban.jpg","fixed":"","borderRadius":0,"popup":false},"type":"freedom"},{"id":"001914","position":{"x":0,"y":221,"w":375,"h":24,"i":"001914"},"config":{"type":"text","text":"30多岁就满脸色斑？错误护肤方法不仅费钱还毁脸！","align":"center","fontSize":"14","backgroundColor":"#0365d0","color":"#fff","fixed":"","bottomY":0,"borderRadius":0,"popup":false},"type":"freedom"},{"id":"165231","position":{"x":0,"y":245,"w":375,"h":282,"i":"165231"},"config":{"type":"img","url":"http://192.168.1.134:7001/public/uploads/bing6.jpg","fixed":"","borderRadius":0,"popup":false},"type":"freedom"},{"id":"937267","position":{"x":0,"y":524,"w":375,"h":56,"i":"937267"},"config":{"type":"chat","data":"[{\"data\":[{\"name\":\"先天性斑\",\"speech\":[\"好的亲 先天性斑点的话在咱们这边是非常常见的，就是咱们通常所说的雀斑，雀斑呈不规则形状分布的，以鼻梁、脸颊最为常见。 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦\",\"您今年多大年龄了呢？\"]},{\"name\":\"老年斑\",\"speech\":[\"好的亲，老年斑是面部的色素沉着而产生的，多为对称的蝶状分布于颧颊部、眶周、前额、上唇和鼻部，引起老年斑的原因有很多，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦\",\"您今年多大年龄了呢？\"]},{\"name\":\"日晒斑\",\"speech\":[\"好的亲 日晒斑的话最直接的影响就是来自于阳光中的紫外线，鼻梁以及两边的位置会多一些，是斑点最常见的一种哦。每个人的情况不一样 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦\",\"您今年多大年龄了呢？\"]},{\"name\":\"雀斑\",\"speech\":[\"好的亲，雀斑呢是一种浅褐色小斑点，针尖至米粒大小，常出现于前额、鼻梁和脸颊等处，偶尔也会出现于颈部、肩部、手背等，多是因为家族遗传引起的。为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦\",\"您今年多大年龄了呢？\"]},{\"name\":\"产后斑\",\"speech\":[\"好的亲 咱们通常所见到的黄褐斑、妊娠斑、蝴蝶斑等都是属于产后长斑的，一般多分布于颧骨、额头、下巴、两颊， 像咱们这边很多女性怀孕之后长斑的，都是非常常见的。每个人的情况不一样，长斑也不一样的哈，为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦\",\"您今年多大年龄了呢？\"]},{\"name\":\"其他\",\"speech\":[\"您今年多大年龄了呢？\"]}],\"width\":\"30%\"},{\"speech\":[\"长斑多久了？\"],\"data\":[{\"name\":\"18-25岁\"},{\"name\":\"26-33岁\"},{\"name\":\"34-45岁\"},{\"name\":\"46-60岁\"},{\"name\":\"61岁以上\"}],\"width\":\"30%\"},{\"speech\":[\"斑,是点状 还是片状的呢 亲？\"],\"data\":[{\"name\":\"1年以下\"},{\"name\":\"1-3年\"},{\"name\":\"3-5年\"},{\"name\":\"5年以上\"}],\"width\":\"40%\"},{\"speech\":[\"大概在什么部位长斑呢？\"],\"data\":[{\"name\":\"点状\"},{\"name\":\"片状\"}],\"width\":\"45%\"},{\"speech\":[\"长斑严重不严重？\"],\"data\":[{\"name\":\"颧骨\"},{\"name\":\"额头\"},{\"name\":\"鼻翼两侧\"},{\"name\":\"脸颊\"},{\"name\":\"下巴\"},{\"name\":\"其他部位\"}],\"width\":\"30%\"},{\"speech\":[\"好的，亲，经老师初步断定您的面斑是由于黑色素增多沉积而形成色斑，你现在肌肤经络基本属于一个不通透的状态，如果现在能够得到及时护理，是不难解决的，要是拖着不管它，可能就会越来越严重了！\",\"方便的话，加一下老师的微信，咱们加了好友后呢，你可以拍张照片发给我，老师了解了你现在的肌肤状态，会更具有针对性的帮你进行更深入的分析，这样才可以更好的帮助你淡化色斑 。你也可以看到老师朋友圈的一些护肤的资料和适合自己肌肤的护理方法。\"],\"data\":[{\"name\":\"严重\"},{\"name\":\"不严重\"}],\"width\":\"45%\"},{\"speech\":[\"这是老师的微信号 （长按复制）<span class='wxh'></span>，亲可以直接到微信中添加，3分钟后老师根据你情况给您祛斑方案，并有机会帮你打造无斑肌肤呦！\"],\"data\":[{\"name\":\"添加老师微信\"},{\"name\":\"获取祛斑方案\"}],\"width\":\"45%\"}]"},"type":"freedom"},{"id":"227523","position":{"x":333,"y":307,"w":42,"h":42,"i":"227523"},"config":{"type":"img","url":"http://192.168.1.134:7001/public/uploads/float.gif","fixed":"","borderRadius":0,"popup":true},"type":"freedom"}],"current":{"id":"227523","position":{"x":333,"y":307,"w":42,"h":42,"i":"227523"},"config":{"type":"img","url":"http://192.168.1.134:7001/public/uploads/float.gif","fixed":"","borderRadius":0,"popup":true},"type":"freedom"},"layoutType":"freedom","popup":false}

export default {
	name: 'setLibrary',
	state: initData,
	effects: dispatch => ({
		saveTemplateData(payload, rootState) {
			console.log(payload, rootState)
			return saveTemplate({
				title:payload.title,
				template:rootState.setLibrary,
				img:payload.img
			})
		},
	}),
	reducers: {
		add(state, payload) {
			let newState = {};
			if (payload.type === 'flow') {
				newState = {
					...state,
					layoutData: [...state.layoutData, payload],
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
				const layoutData = state.layoutData.filter(item => item.id !== payload.id);
				newState = {
					...state,
					layoutData,
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
				current = state.layoutData.filter(item => item.id === payload.id)[0];
			} else {
				current = state.freedomLayout.filter(item => item.id === payload.id)[0];
			}
			return {
				...state,
				current,
			};
		},
		update(state, payload) {
			let layoutData = [];
			let current = {};
			let newState = {};
			if (payload.type === 'flow') {
				layoutData = state.layoutData.map(item => {
					if (item.id === payload.id) {
						item.position = { ...item.position, ...payload.position };
					}
					return item;
				});
				current = state.layoutData.filter(item => item.id === payload.id)[0];
				newState = {
					...state,
					layoutData,
					current,
				};
			} else {
				layoutData = state.freedomLayout.map(item => {
					if (item.id === payload.id) {
						item.position = { ...item.position, ...payload.position };
					}
					return item;
				});
				current = state.freedomLayout.filter(item => item.id === payload.id)[0];
				newState = {
					...state,
					freedomLayout: layoutData,
					current,
				};
			}
			saveLayout(newState);
			return newState;
		},
		setting(state, payload) {
			let layoutData = [];
			let newState = {};
      let current = {}
			console.log(state.current.id, payload, state.freedomLayout, 'payloadpayloadpayload');
			if (state.current.type === 'flow') {
				layoutData = state.layoutData.map(item => {
					if (item.id === state.current.id) {
						item.position = { ...item.position, ...payload.position };
						item.config = { ...item.config, ...payload.config };
            current = {...item}
					}
					return item;
				});
				newState = {
					...state,
					layoutData,
				};
			} else {
				layoutData = state.freedomLayout.map(item => {
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
					freedomLayout: layoutData,
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
    setPopup(state, payload){
      const newState = {
				...state,
				popup: payload.popup,
			};
      saveLayout(newState);
			return newState;
    },
		clearAllData(){
			const newState = {
				layoutData: [],
				freedomLayout: [],
				current: {},
				layoutType: 'freedom',
				popup:false
			};
			saveLayout(newState);
			return newState
		}
	},
};
