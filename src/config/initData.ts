const maxWidth = 375
const height = 667  //iphone 12
const initData: any = {
	maxWidth: maxWidth,
	height: height,
	img: {
		w: maxWidth,
		h: 200,
		config: {
			type: 'img',
			url: `https://dummyimage.com/${maxWidth}x200`,
			fixed: '',
			bottomY: 0,
			borderRadius: 0,
			popup: false,
			popupType: '1',
			isTransform: false,
		},
	},
	text: {
		w: maxWidth,
		h: 20,
		config: {
			type: 'text',
			text: '我是测试文字',
			align: 'center',
			fontSize: '14',
			backgroundColor: '#fff',
			color: '#000',
			fixed: '',
			bottomY: 0,
			borderRadius: 0,
			popup: false,
			popupType: '1',
			isTransform: false,
			isWechat:false
		},
	},
	radio: {
		w: maxWidth,
		h: 70,
		config: {
			type: 'radio',
			title: '我是标题',
			fontSize: '14',
			backgroundColor: '#fff',
			list: [
				{
					label: '我是字段1',
				},
				{
					label: '我是字段2',
				},
				{
					label: '我是字段3',
				},
			],
			layoutType: '3',
			isCheckBox: false,
			templateVal: '1',
			template: [
				{
					'name': '模板1',
					'value': '1'
				},
				{
					'name': '模板2',
					'value': '2'
				}
			]
		},
	},
	chat: {
		w: maxWidth,
		h: 340,
		config: {
			type: 'chat',
			fontSize: '14',
			backgroundColor: '#0365d0',
			borderRadius: 6,
			color: '#fff',
			isTransform: false,
			value: '0',
			data: [{ "speech": ["您好，系统已为您分配专业舒敏老师，一对一为您服务！", " 您好，我是专业舒敏小璇老师，非常高兴为您服务！", "咱们的色斑是怎么产生的呢？<br/><span style='color: rgb(3, 101, 208); font-weight: 600;'>点击下方按钮即可↓</span>"] }, { "data": [{ "name": "大红脸", "speech": ["好的亲，大红脸的常见形成原因是角质受损，毛细血管失去了角质层的天然保护，从而长期受到外界环境刺激，导致血管扩张、淤堵、受损而形成的；环境污染严重，工作压力大，过冷、过热、情绪激动、化妆品和药物刺激会出现皮肤瘙痒、发烫、脸红加重等现象，严重的甚至出现红斑和脱屑症状，这是在警示:你已是肤，需要对皮肤特别的呵护了，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦。", "您今年多大年龄了呢？"] }, { "name": "敏感肌", "speech": ["好的亲，敏感性皮肤是一种问题性皮肤，看上去皮肤较薄，容易过敏，脸上的红血丝明显，一般温度变化，过冷或过热，皮肤都容易泛红、发热，一般容易受坏境因素、季节变化及面部保养品刺激，通常归咎于遗传因素，但更多的是由于使用了激素类的化妆品导致成为敏感肌肤，并可能伴有全身的皮肤敏感。为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "您今年多大年龄了呢？"] }, { "name": "脸部红烫", "speech": ["好的亲，脸部红烫，是由于环境污染严重，工作压力大，导致内分泌失调，还有遇冷遇热、化妆品和药物的刺激等各种外在因素，使皮肤屏障受损，对外界的抵御能力减弱，出现皮肤瘙痒、刺痛、泛红等现象，严重的甚至出现红斑和脱屑症状，这是在警示:你已是敏感肌肤，需要对皮肤特别的呵护了，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦。", "您今年多大年龄了呢？"] }, { "name": "脸部红肿痒", "speech": ["好的亲，脸部肌肤受损后，非常的脆弱敏感，耐受力和免疫力相对较低,一旦皮肤受到任何外界刺激，将不可避免地发生红、肿、痒、刺痛、干、起皮等现象。为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "您今年多大年龄了呢？"] }, { "name": "脸部刺痛", "speech": ["好的亲，脸部刺痛原因很多，大多因为皮肤过度清洁和错误的护肤习惯导致，一旦出现脸部刺痛没有及时护理，极容易形成敏感肌肤。为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "您今年多大年龄了呢？"] }, { "name": "脸部起皮", "speech": ["好的亲，脸部起皮主要是因为角质层受损，肌肤无法正常锁水，导致脸部皮肤干燥脱皮。为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "您今年多大年龄了呢？"] }], "width": "30%" }, { "speech": ["使用护肤品、防晒霜或者彩妆产品会引发发红、灼热、痒或是刺痛感吗？"], "data": [{ "name": "18-25岁" }, { "name": "26-30岁" }, { "name": "31-35岁" }, { "name": "35岁以上" }], "width": "40%" }, { "speech": ["是否涂过含激素的产品？"], "data": [{ "name": "从不" }, { "name": "偶尔" }, { "name": "经常" }], "width": "30%" }, { "speech": ["你是否曾被皮肤科医生确诊为痤疮、红斑痤疮、接触性皮炎或湿疹？"], "data": [{ "name": "是" }, { "name": "否" }, { "name": "不确定" }], "width": "30%" }, { "speech": ["你的脸看上去发红吗？"], "data": [{ "name": "是" }, { "name": "否" }, { "name": "没诊断过" }], "width": "30%" }, { "speech": ["您已经完成全部自测，请添加老师微信：<span class='wxh'>test</span>，领取针对您肤质的淡红方案，3分钟后老师会把自测分析检测结果发送到您的微信！"], "data": [{ "name": "不红" }, { "name": "微红" }, { "name": "非常红" }], "width": "45%" }],
			list: [
				{
					label: '敏感线',
					value: '0'
				},
				{
					label: '祛痘线',
					value: '1'
				},
				{
					label: '祛斑线',
					value: '2'
				}
			]
		},
	},
	bottomWechat: {
		w: maxWidth,
		h: 70,
		config: {
			type: 'bottomWechat',
			text1: '公众号',
			text2: '长按复制，获取祛痘方案',
			align: 'center',
			fontSize: '18',
			backgroundColor: '#000',
			color: '#fff',
			fixed: '',
			bottomY: 0,
			borderRadius: 0,
			popup: false,
			popupType: '1',
			isTransform: false
		},
	},
	timer: {
		w: 100,
		h: 20,
		config: {
			type: 'timer',
			initValue: 0,
			align: 'center',
			fontSize: '14',
			backgroundColor: '#fff',
			color: '#000',
		}
	}
};


export default initData;


