import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const Chat = () => {
	// const dataSource = [
	// 	{
	// 		data: [
	// 			{
	// 				name: '先天性斑',
	// 				speech: [
	// 					'好的亲 先天性斑点的话在咱们这边是非常常见的，就是咱们通常所说的雀斑，雀斑呈不规则形状分布的，以鼻梁、脸颊最为常见。 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
	// 					'您今年多大年龄了呢？',
	// 				],
	// 			},
	// 			{
	// 				name: '老年斑',
	// 				speech: [
	// 					'好的亲，老年斑是面部的色素沉着而产生的，多为对称的蝶状分布于颧颊部、眶周、前额、上唇和鼻部，引起老年斑的原因有很多，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
	// 					'您今年多大年龄了呢？',
	// 				],
	// 			},
	// 			{
	// 				name: '日晒斑',
	// 				speech: [
	// 					'好的亲 日晒斑的话最直接的影响就是来自于阳光中的紫外线，鼻梁以及两边的位置会多一些，是斑点最常见的一种哦。每个人的情况不一样 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
	// 					'您今年多大年龄了呢？',
	// 				],
	// 			},
	// 			{
	// 				name: '雀斑',
	// 				speech: [
	// 					'好的亲，雀斑呢是一种浅褐色小斑点，针尖至米粒大小，常出现于前额、鼻梁和脸颊等处，偶尔也会出现于颈部、肩部、手背等，多是因为家族遗传引起的。为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
	// 					'您今年多大年龄了呢？',
	// 				],
	// 			},
	// 			{
	// 				name: '产后斑',
	// 				speech: [
	// 					'好的亲 咱们通常所见到的黄褐斑、妊娠斑、蝴蝶斑等都是属于产后长斑的，一般多分布于颧骨、额头、下巴、两颊， 像咱们这边很多女性怀孕之后长斑的，都是非常常见的。每个人的情况不一样，长斑也不一样的哈，为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
	// 					'您今年多大年龄了呢？',
	// 				],
	// 			},
	// 			{
	// 				name: '其他',
	// 				speech: ['您今年多大年龄了呢？'],
	// 			},
	// 		],
	// 		width: '30%',
	// 	},
	// 	{
	// 		speech: ['长斑多久了？'],
	// 		data: [
	// 			{
	// 				name: '18-25岁',
	// 			},
	// 			{
	// 				name: '26-33岁',
	// 			},
	// 			{
	// 				name: '34-45岁',
	// 			},
	// 			{
	// 				name: '46-60岁',
	// 			},
	// 			{
	// 				name: '61岁以上',
	// 			},
	// 		],
	// 		width: '30%',
	// 	},
	// 	{
	// 		speech: ['斑,是点状 还是片状的呢 亲？'],
	// 		data: [
	// 			{
	// 				name: '1年以下',
	// 			},
	// 			{
	// 				name: '1-3年',
	// 			},
	// 			{
	// 				name: '3-5年',
	// 			},
	// 			{
	// 				name: '5年以上',
	// 			},
	// 		],
	// 		width: '40%',
	// 	},
	// 	{
	// 		speech: ['大概在什么部位长斑呢？'],
	// 		data: [
	// 			{
	// 				name: '点状',
	// 			},
	// 			{
	// 				name: '片状',
	// 			},
	// 		],
	// 		width: '45%',
	// 	},
	// 	{
	// 		speech: ['长斑严重不严重？'],
	// 		data: [
	// 			{
	// 				name: '颧骨',
	// 			},
	// 			{
	// 				name: '额头',
	// 			},
	// 			{
	// 				name: '鼻翼两侧',
	// 			},
	// 			{
	// 				name: '脸颊',
	// 			},
	// 			{
	// 				name: '下巴',
	// 			},
	// 			{
	// 				name: '其他部位',
	// 			},
	// 		],
	// 		width: '30%',
	// 	},
	// 	{
	// 		speech: [
	// 			'好的，亲，经老师初步断定您的面斑是由于黑色素增多沉积而形成色斑，你现在肌肤经络基本属于一个不通透的状态，如果现在能够得到及时护理，是不难解决的，要是拖着不管它，可能就会越来越严重了！',
	// 			'方便的话，加一下老师的微信，咱们加了好友后呢，你可以拍张照片发给我，老师了解了你现在的肌肤状态，会更具有针对性的帮你进行更深入的分析，这样才可以更好的帮助你淡化色斑 。你也可以看到老师朋友圈的一些护肤的资料和适合自己肌肤的护理方法。',
	// 		],
	// 		data: [
	// 			{
	// 				name: '严重',
	// 			},
	// 			{
	// 				name: '不严重',
	// 			},
	// 		],
	// 		width: '45%',
	// 	},
	// 	{
	// 		speech: [
	// 			'这是老师的微信号 （长按复制）<span class="wxh"></span>，亲可以直接到微信中添加，3分钟后老师根据你情况给您祛斑方案，并有机会帮你打造无斑肌肤呦！',
	// 		],
	// 		data: [
	// 			{
	// 				name: '添加老师微信',
	// 			},
	// 			{
	// 				name: '获取祛斑方案',
	// 			},
	// 		],
	// 		width: '45%',
	// 	},
	// ];
	const config = useSelector(state => {
		return state.setLibrary?.current?.config;
	});
	const [dataSource,setDataSource] = useState(JSON.parse(config.data))
	console.log(config,1111)
	const [speechIndex, setSpeechIndex] = useState(0);
	const [chatText, setChatText] = useState([]);
	useEffect(() => {
		setDataSource(JSON.parse(config.data))
	}, [config]);
	const showSpeech = index => {
		console.log(dataSource[speechIndex], index, speechIndex, 'oooooo');
		const selfText = dataSource[speechIndex].data[index].name;
		let chatTextArr = [];
		if (speechIndex > 0) {
			chatTextArr = dataSource[speechIndex].speech.map(item => {
				return {
					self: false,
					text: item,
				};
			});
		} else {
			chatTextArr = dataSource[speechIndex].data[index].speech.map(item => {
				return {
					self: false,
					text: item,
				};
			});
		}

		let obj = [
			{
				self: true,
				text: selfText,
			},
			...chatTextArr,
		];
		const chat = [...chatText, ...obj];
		setChatText(chat);
		const i = speechIndex + 1;
		setSpeechIndex(i);
	};
	return (
		<>
			<div className="chatBox">
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText">您好，系统已为您分配专业淡斑老师，一对一为您服务！</div>
				</div>
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText"> 您好，我是专业淡斑老师，非常高兴为您服务！</div>
				</div>
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText">
						{' '}
						咱们的色斑是怎么产生的呢？
						<br />
						<span style={{ color: '#0365d0', 'font-weight': 600 }}>点击下方按钮即可↓</span>
					</div>
				</div>
				{chatText.map((item, index) => {
					if (item.self) {
						return (
							<div className="chatItem chatRight" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/header2.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text }}></div>
							</div>
						);
					} else {
						return (
							<div className="chatItem chatLeft" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text }}></div>
							</div>
						);
					}
				})}
				{speechIndex === 7 ? (
					<div className="wechatBot">
						<div className="copyWechatBox">
							<span className="name">微信号:</span>
							<span oncopy="myFunction2()" className="wxh">
								asdfsdf
							</span>
							<span>(长按复制)</span>
						</div>
						<div className="goto">去微信</div>
					</div>
				) : (
					''
				)}
				<div className="select_botton">
					{dataSource[speechIndex] &&
						dataSource[speechIndex].data.map((item, index) => (
							<a
								href="javascript:"
								key={index}
								onClick={() => {
									showSpeech(index);
								}}
								style={{ width: dataSource[speechIndex].width }}
							>
								{item.name}
							</a>
						))}
				</div>
			</div>
		</>
	);
};

export default Chat;
