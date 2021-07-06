import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';

import { LayoutConfig } from '../../typings/LayoutData'
import { message } from 'antd';
import config from '../../config/config';

import avatar_mingan from '../../assets/images/chat/avatar_mingan.jpg'
import avatar_dou from '../../assets/images/chat/avatar_dou.png'
import avatar_ban from '../../assets/images/chat/avatar_ban.png'
import default_avatar from '../../assets/images/chat/default_avatar.png'


interface ChatDialogProps {
	config:LayoutConfig
	type?:string
}

interface ChatText {
	self:boolean
	text?:string
}
const ChatDialog = (props:ChatDialogProps) => {

	const { type } = props
	const chatType = props.config.value
	let dataSource:any = {}
	try {
		dataSource = props.config.data
	} catch (error) {
		message.error('数据源格式错误',2)
		console.error(error,333)
	}
	console.log(props.config,'ChatChatChat')
	
	const [speechIndex, setSpeechIndex] = useState(1);
	const [chatText, setChatText] = useState([] as Array<ChatText>);
	const [defaultChatText,setDefaultChatText] = useState([] as Array<ChatText>);
	const w = document.documentElement.clientWidth > initData.maxWidth? initData.maxWidth : document.documentElement.clientWidth
	const showSpeech = (index:number) => {
		if(type !== 'preview'){return}
		console.log(dataSource[speechIndex], index, speechIndex, 'oooooo');
		const selfText = dataSource[speechIndex].data[index].name;
		let chatTextArr = [];
		if (speechIndex > 1) {
			chatTextArr = dataSource[speechIndex].speech.map((item:string) => {
				return {
					self: false,
					text: item,
				};
			});
		} else {
			chatTextArr = dataSource[speechIndex].data[index].speech.map((item:string) => {
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

	useEffect(()=>{
		const speech = dataSource[0].speech.map((item:string)=>(
			{
				self: false,
				text: item,
			}
		))
		setDefaultChatText(speech)
	},[JSON.stringify(dataSource[0])])

	useEffect(()=>{
		if(type === 'preview'){
			setTimeout(()=>{
				document.documentElement.scrollTop = 100000
			},0)
		}
	},[speechIndex])

	const myCopy = () => {
    window.location.href = "weixin://";
  }

	return (
		<>
			<div className="chatBox">
				{/* <div className="chatItem chatLeft">
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
						咱们的色斑是怎么产生的呢？
						<br />
						<span style={{ color: '#0365d0', 'fontWeight': 600 }}>点击下方按钮即可↓</span>
					</div>
				</div> */}
				{defaultChatText.map((item, index) => {
					return (
						<div className="chatItem chatLeft" key={index}>
							<div className="avatar">
								<img src={chatType === '0'?avatar_mingan:chatType === '1'?avatar_dou:avatar_ban} alt="" />
							</div>
							<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text as string }}></div>
						</div>
					)
				})}
				{chatText.map((item, index) => {
					if (item.self) {
						return (
							<div className="chatItem chatRight" key={index}>
								<div className="avatar">
									<img src={default_avatar} alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text as string }}></div>
							</div>
						);
					} else {
						return (
							<div className="chatItem chatLeft" key={index}>
								<div className="avatar">
									<img src={chatType === '0'?avatar_mingan:chatType === '1'?avatar_dou:avatar_ban} alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text as string }}></div>
							</div>
						);
					}
				})}
				{speechIndex === dataSource.length ? (
					<div className="wechatBot">
						<div className="copyWechatBox">
							<span className="name">微信号:</span>
							<span onCopy={myCopy} className="wxh">test</span>
							<span>(长按复制)</span>
						</div>
						<div className="goto">去微信</div>
					</div>
				) : (
					''
				)}
				<div className="select_botton" style={{width:w}}>
					{dataSource[speechIndex] &&
						dataSource[speechIndex].data.map((item:any, index:number) => (
							<a
								key={index}
								onClick={() => {
									showSpeech(index)
								}}
								style={{ width: dataSource[speechIndex].width }}
							>
								{item.name}
							</a>
						))}
				</div>
			</div>
		</>
	)
};

export default ChatDialog;
